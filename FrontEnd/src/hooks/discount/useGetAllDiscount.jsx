import { useEffect, useState } from 'react';
import DiscountApi from './../../api/DiscountApi';
const useGetAllDiscount = (count) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAllDiscount = async () => {
      try {
        const response = await DiscountApi.getAllDiscount();
        setData(response?.data?.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching book by ID:', error);
        setIsLoading(false);
      }
    };

    fetchAllDiscount();

    return () => {
      // Cleanup or cancel any ongoing requests if necessary
    };
  }, [count]);

  return { data, isLoading };
};

export default useGetAllDiscount;
