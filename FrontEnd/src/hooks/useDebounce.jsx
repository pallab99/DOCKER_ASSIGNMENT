import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
// import { searchTerm } from "../redux/slices/getAllBooksSlice";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const dispatch = useDispatch();
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
      // dispatch(searchTerm(value));
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay, dispatch]);

  return debouncedValue;
};
export default useDebounce;
