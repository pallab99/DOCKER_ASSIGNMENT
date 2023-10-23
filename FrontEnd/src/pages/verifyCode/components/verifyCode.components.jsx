import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/button/button.component";
import "./verifyCode.style.scss";
import { Controller, useForm } from "react-hook-form";
import TextInput from "../../../components/form/text-input/textInput.component";
import AuthApi from "../../../api/AuthApi";
import { alertConfigs } from "../../../utils/alertConfig";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const VerifyCode = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      input1: "",
      input2: "",
      input3: "",
      input4: "",
      input5: "",
      input6: "",
    },
  });
  const showAlert = (res) => {
    if (res.success) {
      toast.success(res.message, alertConfigs.success);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      toast.error(res.message, alertConfigs.error);
    }
  };
  const handleVerifyCode = async (data) => {
    try {
      let verificationCode =
        data.input1 +
        data.input2 +
        data.input3 +
        data.input4 +
        data.input5 +
        data.input6;
      verificationCode = parseInt(verificationCode);
      const verificationData = {
        email: "pallab@gmail.com",
        verificationCode,
      };
      const res = await AuthApi.verifyAccount(verificationData);
      console.log(res.data);
      showAlert(res.data);
    } catch (error) {
      console.log(error.response);
      showAlert(error.response);
    }
  };
  return (
    <div className="otp-container">
      <form className="otp-form" onSubmit={handleSubmit(handleVerifyCode)}>
        {" "}
        <div className="title">OTP</div>{" "}
        <div className="title">Verification Code</div>{" "}
        <p className="message">
          We have sent a verification code to your email
        </p>{" "}
        <div className="inputs">
          <div className="input-container">
            <Controller
              name="input1"
              control={control}
              rules={{
                required: "OTP is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Invalid value provided",
                },
              }}
              render={({ field }) => <TextInput fieldValues={field} />}
            />
            <span className="error-message">
              {errors.input1 && errors.input1.message}
            </span>
          </div>

          <div className="input-container">
            <Controller
              name="input2"
              control={control}
              rules={{
                required: "OTP is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Invalid value provided",
                },
              }}
              render={({ field }) => <TextInput fieldValues={field} />}
            />
            <span className="error-message">
              {errors.input2 && errors.input2.message}
            </span>
          </div>

          <div className="input-container">
            <Controller
              name="input3"
              control={control}
              rules={{
                required: "OTP is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Invalid value provided",
                },
              }}
              render={({ field }) => <TextInput fieldValues={field} />}
            />
            <span className="error-message">
              {errors.input3 && errors.input3.message}
            </span>
          </div>

          <div className="input-container">
            <Controller
              name="input4"
              control={control}
              rules={{
                required: "OTP is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Invalid value provided",
                },
              }}
              render={({ field }) => <TextInput fieldValues={field} />}
            />
            <span className="error-message">
              {errors.input4 && errors.input4.message}
            </span>
          </div>

          <div className="input-container">
            <Controller
              name="input5"
              control={control}
              rules={{
                required: "OTP is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Invalid value provided",
                },
              }}
              render={({ field }) => <TextInput fieldValues={field} />}
            />
            <span className="error-message">
              {errors.input5 && errors.input5.message}
            </span>
          </div>

          <div className="input-container">
            <Controller
              name="input6"
              control={control}
              rules={{
                required: "OTP is required",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Invalid value provided",
                },
              }}
              render={({ field }) => <TextInput fieldValues={field} />}
            />
            <span className="error-message">
              {errors.input6 && errors.input6.message}
            </span>
          </div>
        </div>
        <Button className={"submit-btn"} text={"Verify me"} />
        <ToastContainer />
      </form>
    </div>
  );
};

export default VerifyCode;
