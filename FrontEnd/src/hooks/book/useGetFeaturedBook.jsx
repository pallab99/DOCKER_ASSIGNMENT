import { useEffect, useState } from "react";
import BookApi from "../../api/BookApi";

const useGetFeaturedBooks = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFeaturedBooks = async () => {
      try {
        setLoading(true);
        const response = await BookApi.getFeaturedBook();
        setFeaturedBooks(response?.data?.data?.products || []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error("Error fetching featured books:", error.response);
      }
    };

    fetchFeaturedBooks();

    return () => {
      // Cleanup or cancel any ongoing requests if necessary
    };
  }, []);

  return { featuredBooks, loading };
};

export default useGetFeaturedBooks;
