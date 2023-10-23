import { useEffect, useState } from 'react';
import useGetAllTransaction from '../../../hooks/transaction/useGetAllTransaction';
import AllTransaction from './components/allTransaction.component';

const AllTransactionPage = () => {
  const { data, loading } = useGetAllTransaction();
  const [transactionData, setTransactionData] = useState([]);

  useEffect(() => {
    const formattedData = data.map((ele) => ({
      user: ele?.user?.name || 'notFound',
      email: ele?.user?.email || 'notFound',
      phoneNumber: ele?.user?.phoneNumber || 'notFound',
      totalPrice: ele?.totalPrice,
      paymentMethod: ele?.paymentMethod,
      createdAt: ele?.createdAt,
    }));

    setTransactionData(formattedData);
  }, [data, loading]);

  return <AllTransaction data={transactionData} isLoading={loading} />;
};

export default AllTransactionPage;
