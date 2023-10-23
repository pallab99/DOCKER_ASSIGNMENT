import { useEffect, useState } from 'react';
import TransactionApi from '../../api/TransactionApi';

const useGetTransactionByUser = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTransactionByUser = async () => {
      try {
        setLoading(true);
        const response = await TransactionApi.getTransactionByUser();
        setData(response?.data?.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log('Error fetching featured books:', error);
      }
    };

    fetchTransactionByUser();

    return () => {
      // Cleanup or cancel any ongoing requests if necessary
    };
  }, []);

  return { data, loading };
};

export default useGetTransactionByUser;
