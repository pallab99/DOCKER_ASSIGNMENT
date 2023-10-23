import { useEffect, useState } from "react";
import BookApi from "../../api/BookApi";
import { useSelector } from "react-redux";

const useGetAllBooksAdmin = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const callGetAllBooksAdminAgain = useSelector(
    (state) => state.getAllBooks.hitGetAllBooksAdmin
  );

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        setLoading(true);
        const response = await BookApi.getAllBooksAdmin();
        setData(response?.data?.data?.products || []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Error fetching featured books:", error);
      }
    };

    fetchAllBooks();

    return () => {
      // Cleanup or cancel any ongoing requests if necessary
    };
  }, [callGetAllBooksAdminAgain]);

  return { data, loading };
};

export default useGetAllBooksAdmin;
