import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-responsive-modal';
import UserApi from '../../../api/UserApi';
import { useForm, Controller } from 'react-hook-form';
import TextInput from '../../form/text-input/textInput.component';
import ButtonLoader from '../../ui/button-loader';
import Button from '../../ui/button/button.component';
import { alertConfigs } from '../../../utils/alertConfig';
import { ToastContainer, toast } from 'react-toastify';

/* eslint-disable react/prop-types */
export default function WalletModal({ openWalletModal, setOpenWalletModal }) {
  const [userBalance, setUserBalance] = useState(0);
  const user = useSelector((state) => state?.auth?.userData);
  const [btnClicked, setBtnClicked] = useState(false);
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      amount: '',
    },
  });
  useEffect(() => {
    if (openWalletModal) {
      getUserBalance();
    }
  }, [openWalletModal]);
  const getUserBalance = async () => {
    try {
      const res = await UserApi.getUserBalance();
      setUserBalance(res?.data?.data?.balance);
    } catch (error) {
      console.log(error);
    }
  };
  const showAlert = (res) => {
    if (res.success) {
      toast.success(res.message, alertConfigs.success);
      setOpenWalletModal();
    } else {
      toast.error(res.message, alertConfigs.error);
    }
  };
  const handleUserRecharge = async (data) => {
    setBtnClicked(true);
    try {
      console.log(data);
      const amountData = {
        amount: Number(data.amount),
      };
      const res = await UserApi.addBalanceByUser(amountData);
      reset();
      showAlert(res.data);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      showAlert(error.response);
      setBtnClicked(false);
    } finally {
      setBtnClicked(false);
    }
  };
  return (
    <>
      <Modal
        open={openWalletModal}
        onClose={() => setOpenWalletModal(!openWalletModal)}
        center
      >
        <div className="wallet-modal-div">
          <h2 className="font-18 font-bold text-center">User Wallet</h2>
          <p className="font-18 font-bold mb-5">User : {user?.name}</p>
          <p className="font-18 font-bold mb-5">Balance : {userBalance | 0}</p>
          <form onSubmit={handleSubmit(handleUserRecharge)}>
            <div className="input-container items-center-grid">
              <p className="font-18 font-bold mb-5">
                Enter Your Amount for recharge
              </p>

              <Controller
                name="amount"
                control={control}
                rules={{
                  required: 'amount is required',
                  min: {
                    value: 1,
                    message: 'Amount can not be less than 1',
                  },
                  max: {
                    value: 30000,
                    message: 'Amount can not be greater than 30000',
                  },
                }}
                render={({ field }) => (
                  <TextInput
                    placeholder={'Enter Your amount'}
                    fieldValues={field}
                    className={'text-input'}
                    type="number"
                  />
                )}
              />
              <span className="error-message">
                {errors?.amount && errors?.amount?.message}
              </span>
              <div className="content-center-flex">
                {btnClicked ? (
                  <ButtonLoader />
                ) : (
                  <Button
                    className={'create-book-btn mt-22'}
                    text={'Recharge'}
                  ></Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </Modal>
      <ToastContainer />
    </>
  );
}
