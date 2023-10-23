import { useEffect, useState } from 'react';
import BookApi from '../../api/BookApi';

const useGetAllBooks = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        setLoading(true);
        const response = await BookApi.getAllBooks();
        setData(response?.data?.data?.products || []);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log('Error fetching featured books:', error);
      }
    };

    fetchAllBooks();

    return () => {
      // Cleanup or cancel any ongoing requests if necessary
    };
  }, []);

  return { data, loading };
};

export default useGetAllBooks;
