import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { isStrongPassword } from "../../../helper/isStrongPassword";
import PasswordInput from "../../../components/form/password-input/passwordInput.component";
import ButtonLoader from "../../../components/ui/button-loader";
import Button from "../../../components/ui/button/button.component";
import { useState } from "react";
import AuthApi from "../../../api/AuthApi";
import { ToastContainer, toast } from "react-toastify";
import { alertConfigs } from "../../../utils/alertConfig";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { resetToken, userId } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });
  const showAlert = (res) => {
    if (res.success) {
      toast.success(res.message, alertConfigs.success);
      navigate("/login");
    } else {
      toast.error(res.message, alertConfigs.error);
    }
  };
  const handlePasswordReset = async (data) => {
    setIsLoading(true);
    try {
      data.resetToken = resetToken;
      data.userId = userId;
      console.log(data);
      const res = await AuthApi.resetPassword(data);
      showAlert(res.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      showAlert(error.response);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(handlePasswordReset)} className="login-form">
        <div className="input-container mt-10 mb-10">
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 8,
                message: "Minimum length must be 8",
              },
              maxLength: {
                value: 15,
                message: "Max length can not exceed 15",
              },
              validate: (value) => {
                return isStrongPassword(value);
              },
            }}
            render={({ field }) => (
              <PasswordInput
                placeholder={"Enter your password"}
                filedValues={field}
                className={"password-input"}
              />
            )}
          />
          <span className="error-message mt-5 mb-5">
            {errors.password && errors.password.message}
          </span>
        </div>

        <div className="input-container mt-10 mb-10">
          <Controller
            name="confirmPassword"
            control={control}
            rules={{
              required: "Confirm Password is required",
              minLength: {
                value: 8,
                message: "Minimum length must be 8",
              },
              maxLength: {
                value: 15,
                message: "Max length can not exceed 15",
              },
              validate: (value) => {
                if (value != watch("password"))
                  return "Password and confirm password should match";
                return isStrongPassword(value);
              },
            }}
            render={({ field }) => (
              <PasswordInput
                placeholder={"Enter your confirm password"}
                filedValues={field}
                className={"password-input"}
              />
            )}
          />
          <span className="error-message mt-5 mb-5">
            {errors.confirmPassword && errors.confirmPassword.message}
          </span>
        </div>
        {isLoading ? (
          <ButtonLoader />
        ) : (
          <Button className={"submit-btn"} text={"Reset"}></Button>
        )}
        <ToastContainer />
      </form>
    </div>
  );
};

export default ResetPassword;
