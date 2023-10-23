import Order from './components/order.component';

import useGetTransactionByUser from '../../../hooks/transaction/useGetTrnsactionByUser';

const OrderPage = () => {
  const { data, loading } = useGetTransactionByUser();
  return <Order data={data} isLoading={loading}></Order>;
};

export default OrderPage;
