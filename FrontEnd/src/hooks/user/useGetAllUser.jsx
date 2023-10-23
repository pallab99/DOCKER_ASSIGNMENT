import { useEffect, useState } from "react";
import UserApi from "../../api/UserApi";
import { useSelector } from "react-redux";

const useGetAllUser = (token, admin) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const callGetAllUserAdminAgain = useSelector(
    (state) => state.getAllUser.hitGetAllUserAdmin
  );
  useEffect(() => {
    const fetchAllUser = async () => {
      try {
        const response = await UserApi.getAllUser();
        setData(response?.data?.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching book by ID:", error);
        setIsLoading(false);
      }
    };

    if (token && admin) {
      fetchAllUser();
    }

    return () => {
      // Cleanup or cancel any ongoing requests if necessary
    };
  }, [token, admin, callGetAllUserAdminAgain]);

  return { data, isLoading };
};

export default useGetAllUser;
