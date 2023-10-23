/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./cart.style.scss";
import CartApi from "../../../../../api/CartApi";
import Loader from "../../../../../components/ui/loader/loader";
import Button from "../../../../../components/ui/button/button.component";
import { Link, useNavigate } from "react-router-dom";
import { callCartApi } from "../../../../../redux/slices/cartSlice";
import { useDispatch } from "react-redux";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import UserApi from "../../../../../api/UserApi";
import { Controller, useForm } from "react-hook-form";
import TransactionApi from "../../../../../api/TransactionApi";
import { toast } from "react-toastify";
import { alertConfigs } from "../../../../../utils/alertConfig";
import useGetBookById from "../../../../../hooks/book/useGetBookById";
import useGetCartByUser from "../../../../../hooks/cart/useGetCartByUser";
import TransactionModal from "../transaction/transaction.Component";
import CartButtonGroup from "../cartButtonGroup/CartButtonGroup";
const Cart = () => {
  const navigate = useNavigate();

  const [count, setCount] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [userBalance, setUserBalance] = useState(0);
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  const token = Cookies.get("accessToken");
  const { cartData, totalAmount, beforeDiscount, loading, noCartData, cartId } =
    useGetCartByUser(count, token);
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      paymentMethod: "",
    },
  });
  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      setUser(jwtDecode(token));
    }
  }, []);
  useEffect(() => {
    if (openModal) {
      getUserBalance();
    }
  }, [openModal]);

  const showAlert2 = (res) => {
    if (res.success) {
      toast.success(res.message, alertConfigs.success);
    } else {
      toast.error(res.message, alertConfigs.error);
    }
  };

  const getUserBalance = async () => {
    try {
      const res = await UserApi.getUserBalance();
      setUserBalance(res?.data?.data?.balance);
    } catch (error) {
      console.log(error);
    }
  };
  const handleCartItemIncrease = async (bookId) => {
    try {
      const res = await CartApi.increaseCartItemsByOne(bookId);
      showAlert2(res.data);
      setCount((prev) => prev + 1);
    } catch (error) {
      console.log(error.response);
      showAlert2(error.response);
    }
  };
  const handleCartItemDecrease = async (bookId) => {
    try {
      const res = await CartApi.decreaseCartItemsByOne(bookId);
      console.log("cart", res.data);
      dispatch(callCartApi());
      setCount((prev) => prev + 1);
      showAlert2(res.data);
    } catch (error) {
      console.log(error.response);
      showAlert2(error.response);
    }
  };
  const handleRemoveCartItem = async (bookId, quantity) => {
    try {
      console.log({ bookId, quantity });
      const res = await CartApi.removeBookFromCart(bookId, quantity);
      console.log(res);
      if (res.data.success) {
        setCount((prev) => prev + 1);
        dispatch(callCartApi());
      }
      showAlert2(res.data);
    } catch (error) {
      console.log(error);
      showAlert2(error.response);
    }
  };
  const openCheckoutModal = () => {
    setOpenModal(true);
  };
  const closeCheckoutModal = () => {
    setOpenModal(false);
  };
  const showAlert = (res) => {
    if (res.success) {
      toast.success("Order Placed Successfully", alertConfigs.success);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      toast.error(res.message, alertConfigs.error);
    }
  };
  const handlePayment = async (data) => {
    try {
      console.log(data?.paymentMethod, cartId);
      const res = await TransactionApi.createTransaction(
        cartId,
        data?.paymentMethod
      );

      console.log(res.data);
      showAlert(res.data);
      dispatch(callCartApi());
    } catch (error) {
      console.log(error.response);
      showAlert(error.response);
    }
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {!cartData || cartData?.length === 0 ? (
            <div className="no-cart-header">
              <h1 className="text-center">No Items in the cart</h1>
              <Link to="/books">
                <Button
                  className={"navigate-to-home"}
                  text={"Continue shopping"}
                ></Button>
              </Link>
            </div>
          ) : (
            <div className="cart-container">
              <div className="cart-wrapper">
                <h1 className="text-center">Shopping Cart</h1>
                {cartData?.map((ele, index) => {
                  return (
                    <div
                      key={ele?.book?._id}
                      className="cart-details mt-20 mb-10"
                    >
                      <img
                        src="https://149522020.v2.pressablecdn.com/wp-content/uploads/2021/03/b960fb_78fdaf81df9b43ba9efe64df9b7356e3mv2.jpeg"
                        alt=""
                      />
                      <div className="middle-div">
                        <div className="title-author">
                          <span className="font-18 font-bold mt-5 mb-5">
                            {cartData[index]?.book?.title}
                          </span>
                          <span className="font-18 font-bold chip  mb-5">
                            {cartData[index]?.book?.category}
                          </span>
                          <span className="font-18 font-bold  mb-5 color-royal-blue">
                            ${cartData[index]?.book?.price}
                          </span>
                          <Button
                            className="font-18 font-bold color-red  mb-5 remove-book bg-transparent"
                            text={"Remove"}
                            handleButtonClick={() =>
                              handleRemoveCartItem(
                                cartData[index]?.book?._id,
                                cartData[index]?.quantity
                              )
                            }
                          ></Button>
                        </div>
                        <div className="cart-actions-btn">
                          <CartButtonGroup
                            handleCartItemIncrease={handleCartItemIncrease}
                            cartData={cartData}
                            index={index}
                            handleCartItemDecrease={handleCartItemDecrease}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div className="font-25  amount-div">
                  <p className="color-gray">Total Amount</p>
                  <div className="div">
                    <strike className="color-red">${beforeDiscount}</strike>
                    <p className="color-royal-blue">${totalAmount}</p>
                  </div>
                </div>
                <div className="checkout-btn mt-10 mb-10">
                  <Button
                    className={"checkout"}
                    text={"Continue to payment"}
                    handleButtonClick={openCheckoutModal}
                  ></Button>
                </div>
              </div>
              <TransactionModal
                openModal={openModal}
                closeCheckoutModal={closeCheckoutModal}
                user={user}
                userBalance={userBalance}
                handleSubmit={handleSubmit}
                handlePayment={handlePayment}
                control={control}
                errors={errors}
                cartId={cartId}
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Cart;
