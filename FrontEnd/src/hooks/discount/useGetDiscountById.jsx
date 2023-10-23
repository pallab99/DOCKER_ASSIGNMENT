import { useEffect, useState } from 'react';
import discountApi from './../../api/DiscountApi';

const useGetDiscountById = (discountId) => {
  const [discountData, setDiscountData] = useState(null);
  const [isDiscountLoading, setIsDiscountLoading] = useState(true);

  useEffect(() => {
    const fetchDiscountById = async () => {
      try {
        const response = await discountApi.getDiscountById(discountId);
        setDiscountData(response?.data?.data);
        setIsDiscountLoading(false);
      } catch (error) {
        console.error('Error fetching book by ID:', error);
        setIsDiscountLoading(false);
      }
    };

    if (discountId) {
      fetchDiscountById();
    }

    return () => {
      // Cleanup or cancel any ongoing requests if necessary
    };
  }, [discountId]);

  return { discountData, isDiscountLoading };
};

export default useGetDiscountById;
