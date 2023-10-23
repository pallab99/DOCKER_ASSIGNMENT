/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationPage from ".././pages/registration/registration";
import VerifyCodePage from ".././pages/verifyCode/verifyCode";
import HomePage from ".././pages/home/home";
import AllBooksPage from ".././pages/viewAllBooks/viewAllBooks";
import BookDetailsPage from ".././pages/bookDetails/bookDetails";
import CartPage from ".././pages/user/cart/cart";
import Navbar from ".././components/navbar/navbar.component";
import Footer from ".././components/footer/footer.componnet";
import ProfilePage from ".././pages/user/profile/profile";
import NotFoundPage from ".././pages/404/notFound";
import CreateBookPage from ".././pages/admin/createBook/createBook";
import AdminProtectedRoutePage from ".././pages/adminProtectedRoute/adminProtectedRoute";
import UserProtectedRoutePage from ".././pages/userProtectedRoute/userProtectedRoute";
import UpdateBookPage from ".././pages/admin/updateBook/updateBook";
import DiscountPage from ".././pages/admin/create-discount/discount";
import UpdateDiscountPage from ".././pages/admin/update-discount/updateDiscount";
import AllTransactionPage from ".././pages/admin/all-transaction/allTransaction";
import AllUserPage from ".././pages/admin/all-user/allUser";
import EditUserPage from ".././pages/admin/edit-user/editUser";
import DashBoardPage from ".././pages/admin/dashboard/dashBoard";
import AllDisCountPage from ".././pages/admin/all-discount/allDiscount";
import LoginPage from ".././pages/login/login";
import OrderPage from "../pages/user/order/order";
import Cookies from "js-cookie";
import ForgetPasswordPage from "../pages/forget-password/forgetPassword";
import ResetPasswordPage from "../pages/reset-password/resetPassword";
import SomethingWentWrongPage from "../pages/something-went-wrong/someThingWentWrong";
export default function AllRoutes({ rank }) {
  const token = Cookies.get("accessToken");
  console.log(token);
  console.log(rank);
  return (
    <Router>
      {!token || (rank != undefined && rank === 2) ? <Navbar /> : null}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registration" element={<RegistrationPage />} />
        <Route path="/verifyCode" element={<VerifyCodePage />} />
        <Route path="/books" element={<AllBooksPage />} />
        <Route path="/book/details/:bookId" element={<BookDetailsPage />} />
        <Route path="/forget-password" element={<ForgetPasswordPage />}></Route>
        <Route
          path="/reset-password/:resetToken/:userId"
          element={<ResetPasswordPage />}
        ></Route>
        <Route
          path="/something-went-wrong"
          element={<SomethingWentWrongPage />}
        ></Route>
        <Route element={<AdminProtectedRoutePage />}>
          <Route path="/admin/dashboard" element={<DashBoardPage />}></Route>
          <Route path="/book/create" element={<CreateBookPage />} />
          <Route path="/book/update/:bookId" element={<UpdateBookPage />} />
          <Route path="/discount/all" element={<AllDisCountPage />}></Route>
          <Route path="/book/add-discount" element={<DiscountPage />} />
          <Route
            path="/book/update-discount/:discountId"
            element={<UpdateDiscountPage />}
          />
          <Route
            path="/transaction/all"
            element={<AllTransactionPage />}
          ></Route>
          <Route path="/user/all" element={<AllUserPage />}></Route>
          <Route path="/user/update/:userId" element={<EditUserPage />}></Route>
        </Route>

        <Route element={<UserProtectedRoutePage />}>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/user/profile" element={<ProfilePage />} />
          <Route path="/user/order" element={<OrderPage />}></Route>
        </Route>

        <Route path="*" element={<NotFoundPage />}></Route>
      </Routes>
      {!token || (rank != undefined && rank === 2) ? <Footer /> : null}
    </Router>
  );
}
