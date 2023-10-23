import Modal from "react-responsive-modal";
import { Controller, useForm } from "react-hook-form";
import Button from "../../../../../components/ui/button/button.component";
import TransactionApi from "../../../../../api/TransactionApi";
import { ToastContainer, toast } from "react-toastify";
import { alertConfigs } from "../../../../../utils/alertConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { callCartApi } from "../../../../../redux/slices/cartSlice";
import { useState } from "react";
import ButtonLoader from "../../../../../components/ui/button-loader";

/* eslint-disable react/prop-types */
export default function TransactionModal({
  openModal,
  closeCheckoutModal,
  user,
  userBalance,
  cartId,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [btnClicked, setBtnClicked] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    control,
    // watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      paymentMethod: "",
    },
  });
  const showAlert = (res) => {
    if (res.success) {
      toast.success("Order Placed Successfully", alertConfigs.success);
      setTimeout(() => {
        navigate("/user/order");
      }, 2000);
    } else {
      toast.error(res.message, alertConfigs.error);
    }
  };
  const handlePayment = async (data) => {
    setBtnClicked(true);
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
      setBtnClicked(false);
    } finally {
      setBtnClicked(false);
    }
  };
  return (
    <>
      <Modal
        open={openModal}
        onClose={closeCheckoutModal}
        center
        classNames={{
          overlay: "customOverlay",
          modal: "customModal",
        }}
      >
        <h2 className="font-18 font-bold text-center">Proceed to checkout</h2>
        <p className="font-18 font-bold">User : {user?.name}</p>
        <p className="font-18 font-bold">Balance : {userBalance}</p>

        <p className="font-18 font-bold">
          Billing Address : {user?.address?.street},{user?.address?.area},
          {user?.address?.city}, {user?.address?.country}
        </p>
        <div className="input-container">
          <form onSubmit={handleSubmit(handlePayment)}>
            <Controller
              name="paymentMethod"
              control={control}
              rules={{
                required: "Payment method is required",
              }}
              render={({ field }) => (
                <select
                  {...field}
                  className="text-input payment-method-select mt-10 mb-10"
                >
                  <option value="">Select your payment method</option>
                  <option value="online">Online</option>
                  <option value="card">Card</option>
                  <option value="cash">Cash</option>
                </select>
              )}
            />
            <br />
            <span className="error-message">
              {errors.paymentMethod && errors.paymentMethod.message}
            </span>
            {btnClicked ? (
              <ButtonLoader />
            ) : (
              <Button className={"checkout"} text={"Payment"}></Button>
            )}
          </form>
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
}
