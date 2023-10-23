import { useState } from "react";
import useGetAllDiscount from "../../../hooks/discount/useGetAllDiscount";
import AllDisCount from "./components/allDiscount.component";

const AllDisCountPage = () => {
  const [count, setCount] = useState(0);
  const { data, isLoading } = useGetAllDiscount(count);
  return (
    <AllDisCount
      data={data}
      loading={isLoading}
      count={count}
      setCount={setCount}
    />
  );
};

export default AllDisCountPage;
