import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { isUser } from "../../helper/tokenAuthorizer";

const UserProtectedRoutePage = () => {
  console.log("gggg");
  const token = Cookies.get("accessToken");
  console.log("token", token);
  if (!token) {
    return <Navigate to="*" />;
  }
  const admin = isUser(token);

  return admin ? <Outlet /> : <Navigate to="*" />;
};

export default UserProtectedRoutePage;
