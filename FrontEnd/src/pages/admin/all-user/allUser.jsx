import Cookies from "js-cookie";
import useGetAllUser from "../../../hooks/user/useGetAllUser";
import AllUser from "./components/allUser.component";
import { useState } from "react";
import { isAdmin } from "../../../helper/tokenAuthorizer";
import { useEffect } from "react";

const AllUserPage = () => {
  const token = Cookies.get("accessToken");
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    if (token) {
      if (isAdmin(token)) {
        setAdmin(true);
      }
    }
  }, [token]);
  const { data, isLoading } = useGetAllUser(token, admin);
  return <AllUser data={data} isLoading={isLoading}></AllUser>;
};

export default AllUserPage;
