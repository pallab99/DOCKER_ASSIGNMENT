import { useEffect, useState } from "react";
import BookApi from "../../api/BookApi";

const useGetAllAuthors = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllAuthors = async () => {
      try {
        setLoading(true);
        const response = await BookApi.getAllAuthors();
        setData(response?.data?.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("Error fetching featured books:", error);
      }
    };

    fetchAllAuthors();

    return () => {
      // Cleanup or cancel any ongoing requests if necessary
    };
  }, []);

  return { data, loading };
};

export default useGetAllAuthors;
