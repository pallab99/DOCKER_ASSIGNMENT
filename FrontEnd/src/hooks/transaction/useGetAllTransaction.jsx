import { useEffect, useState } from 'react';
import TransactionApi from '../../api/TransactionApi';

const useGetAllTransaction = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAllTransaction = async () => {
      try {
        setLoading(true);
        const response = await TransactionApi.getAllTransaction();
        setData(response?.data?.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log('Error fetching featured books:', error);
      }
    };

    fetchAllTransaction();

    return () => {
      // Cleanup or cancel any ongoing requests if necessary
    };
  }, []);

  return { data, loading };
};

export default useGetAllTransaction;
