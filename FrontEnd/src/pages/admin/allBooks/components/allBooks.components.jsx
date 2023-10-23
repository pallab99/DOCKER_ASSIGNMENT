/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import "./allBooks.style.scss";
import {
  useTable,
  useGlobalFilter,
  UseSortBy,
  usePagination,
} from "react-table";
import { useNavigate } from "react-router-dom";
import Loader from "../../../../components/ui/loader/loader";
import ReactTableComponent from "../../../../components/ui/table/table";
import BookApi from "../../../../api/BookApi";
import { useDispatch } from "react-redux";
import { hitGetAllBooksAdmin } from "../../../../redux/slices/getAllBooksSlice";
import { ToastContainer, toast } from "react-toastify";
import { alertConfigs } from "../../../../utils/alertConfig";
import { formatDate } from "../../../../helper/dateFormatter";
import AllBooksActionButtonGroup from "./AllBookActionButtonGroup/AllBookActionButtonGroup.component";
import GlobalFilter from "../../../../components/ui/table/globalFilter";
import Button from "../../../../components/ui/button/button.component";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const AdminALLBooks = ({ data, isLoading }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
        sortType: "alphanumeric",
      },
      {
        Header: "Author",
        accessor: "author",
      },
      {
        Header: "Price",
        accessor: "price",
      },
      {
        Header: "Rating",
        accessor: "rating",
      },
      {
        Header: "Stock",
        accessor: "stock",
      },
      {
        Header: "Category",
        accessor: "category",
      },

      {
        Header: "Published At",
        accessor: "publishedAt",
        Cell: ({ value }) => <div>{formatDate(value)}</div>,
      },
      {
        Header: "Action",
        accessor: "action",
        Cell: ({ row }) => (
          <AllBooksActionButtonGroup
            onOpenClick={onOpenClick}
            onEditClick={onEditClick}
            onDeleteClick={onDeleteClick}
            row={row}
          />
        ),
      },
    ],
    []
  );
  const onOpenClick = (bookId) => {
    navigate(`/book/details/${bookId}`);
  };
  const onEditClick = (bookId) => {
    navigate(`/book/update/${bookId}`);
  };
  const showAlert = (res) => {
    if (res.success) {
      toast.success(res.message, alertConfigs.success);
    } else {
      toast.error(res.message, alertConfigs.error);
    }
  };
  const onDeleteClick = async (bookId) => {
    try {
      const res = await BookApi.deleteBookById(bookId);
      dispatch(hitGetAllBooksAdmin());
      showAlert(res.data);
    } catch (error) {
      console.log(error.response);
      showAlert(error.response);
    }
  };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    usePagination
  );
  const { globalFilter } = state;
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="all-book-table-container">
            <div className="table-container mt-20 mb-20">
              <p className="font-bold font-30 text-center mb-20">
                {"All book list"}
              </p>
              <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
              <table {...getTableProps()} className="user-table">
                <thead>
                  {headerGroups.map((headerGroup, index) => (
                    <tr key={index} {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th key={index} {...column.getHeaderProps()}>
                          {column.render("Header")}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                  {page.map((row, index) => {
                    prepareRow(row);
                    return (
                      <tr key={index} {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <td key={index} {...cell.getCellProps()}>
                              {cell.render("Cell")}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="table-pagination-button mb-20">
              <Button
                className={`pagination-btn `}
                text={<FaArrowLeft />}
                handleButtonClick={previousPage}
                disabled={!canPreviousPage}
              />

              <Button
                className={"pagination-btn next-page"}
                text={<FaArrowRight />}
                handleButtonClick={nextPage}
                disabled={!canNextPage}
              ></Button>
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </>
  );
};

export default AdminALLBooks;
