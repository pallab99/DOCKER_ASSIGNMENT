import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";
import { isAdmin } from "../../helper/tokenAuthorizer";

const AdminProtectedRoutePage = () => {
  console.log("gggg");
  const token = Cookies.get("accessToken");
  console.log("token", token);
  if (!token) {
    return <Navigate to="*" />;
  }
  const admin = isAdmin(token);

  return admin ? <Outlet /> : <Navigate to="*" />;
};

export default AdminProtectedRoutePage;
