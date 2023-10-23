/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import './allBooks.style.scss';
import BookApi from '../../../../api/BookApi';
import Loader from '../../../../components/ui/loader/loader';
import useDebounce from '../../../../hooks/useDebounce';
import { useNavigate } from 'react-router-dom';
import Pagination from '../../../../components/ui/pagination/pagination';
import { useSelector } from 'react-redux';
import SortSelect from '../../../../components/form/sort-select/sortSelect';
import { useForm } from 'react-hook-form';
import CateGoryFilterCheckbox from '../../../../components/form/checkbox/categoryFilterCheckbox/categoryFilterCheckbox';
import AuthorFilterCheckbox from '../authorFilterCheckbox/authorFilterCheckBox';
import { AllBooksCard } from '../allBooksCard/allBooksCard';

const AllBooks = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const searchTermState = useSelector(
    (state) => state.getAllBooks.debouncedValue
  );
  const debouncedSearchTerm = useDebounce(searchTermState, 1000);
  const [offset, setOffset] = useState(1);
  const [limit] = useState(9);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterValue, setFilterValue] = useState([]);
  const [authorFilterValue, setAuthorFilterValue] = useState([]);
  const [nodataFound, setNodataFound] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getAllBooks();
  }, [
    debouncedSearchTerm,
    offset,
    sortBy,
    sortOrder,
    filterValue,
    authorFilterValue,
  ]);

  const getAllBooks = async () => {
    try {
      setLoading(true);
      const res = await BookApi.getAllBooks(
        offset,
        limit,
        searchTermState,
        sortBy,
        sortOrder,
        filterValue,
        authorFilterValue
      );
      console.log(res.data);
      if (res?.data.data?.length === 0) {
        setNodataFound(true);
      }
      setBooks(res?.data?.data?.products);
      setTotalPages(res?.data?.data?.totalPages);
      setCurrentPage(res?.data?.data?.currentPage);
      setLoading(false);
    } catch (error) {
      console.log(error.response);
    }
  };
  const handlePageChange = (pageNumber) => {
    setOffset(pageNumber);
  };
  const handleShowDetails = (bookId) => {
    navigate(`/book/details/${bookId}`);
  };
  const handlePrevPage = () => {
    setOffset((prev) => prev - 1);
  };
  const handleNextPage = () => {
    setOffset((prev) => prev + 1);
  };
  const toggleSortOrder = (e) => {
    setSortOrder(e.target.value);
  };
  const toggleSortBy = (e) => {
    setSortBy(e.target.value);
  };
  const { register } = useForm({ mode: 'onChange' });

  const handleCheckboxChange = (e) => {
    const value = e.target.value;
    if (filterValue.includes(value)) {
      setFilterValue((prevFilterValue) =>
        prevFilterValue.filter((item) => item !== value)
      );
    } else {
      setFilterValue((prevFilterValue) => [...prevFilterValue, value]);
    }
  };
  const handleAuthorCheckboxChange = (e) => {
    const value = e.target.value;
    if (authorFilterValue.includes(value)) {
      setAuthorFilterValue((prevFilterValue) =>
        prevFilterValue.filter((item) => item !== value)
      );
    } else {
      setAuthorFilterValue((prevFilterValue) => [...prevFilterValue, value]);
    }
  };
  return (
    <>
      <h1 className="text-center mb-20 mt-20">All Books</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          <SortSelect
            toggleSortBy={toggleSortBy}
            sortBy={sortBy}
            toggleSortOrder={toggleSortOrder}
            sortOrder={sortOrder}
          />
          <div className="collection-parent-container">
            <div className="filter-container">
              <div className="category-filter-div ">
                <p className="font-18 font-bold text-center">Category</p>
                <CateGoryFilterCheckbox
                  register={register}
                  handleCheckboxChange={handleCheckboxChange}
                ></CateGoryFilterCheckbox>
              </div>

              <div className="category-filter-div mt-20">
                <p className="font-18 font-bold text-center">Author</p>
                <AuthorFilterCheckbox
                  register={register}
                  handleCheckboxChange={handleAuthorCheckboxChange}
                ></AuthorFilterCheckbox>
              </div>
            </div>
            {
              <>
                {nodataFound && !books?.length ? (
                  <h1 className="text-center mt-20">No Books Found</h1>
                ) : (
                  <div className="collection-container ">
                    {books?.map((book) => {
                      return (
                        <AllBooksCard
                          book={book}
                          handleShowDetails={handleShowDetails}
                          key={book?._id}
                        />
                      );
                    })}
                  </div>
                )}
              </>
            }
          </div>
        </>
      )}
      <Pagination
        handlePrevPage={handlePrevPage}
        currentPage={currentPage}
        handleNextPage={handleNextPage}
        totalPages={totalPages}
        limit={limit}
        books={books}
        handlePageChange={handlePageChange}
      />
    </>
  );
};

export default AllBooks;
