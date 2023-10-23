import { useEffect, useState } from "react";
import BookApi from "../../api/BookApi";
import { useSelector } from "react-redux";

const useGetBookById = (bookId) => {
  const callBookDetailsApi = useSelector(
    (state) => state.bookReview.isBookDetailsApiCalled
  );
  console.log("get book by id", callBookDetailsApi);
  const [bookData, setBookData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBookById = async () => {
      try {
        const response = await BookApi.getBookById(bookId);
        setBookData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching book by ID:", error);
        setIsLoading(false);
      }
    };

    if (bookId) {
      fetchBookById();
    }

    return () => {
      // Cleanup or cancel any ongoing requests if necessary
    };
  }, [bookId, callBookDetailsApi]);

  return { bookData, isLoading };
};

export default useGetBookById;
