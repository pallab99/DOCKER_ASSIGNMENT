import { Controller, useForm } from "react-hook-form";
import TextInput from "../../../components/form/text-input/textInput.component";
import ButtonLoader from "../../../components/ui/button-loader";
import Button from "../../../components/ui/button/button.component";
import { Link } from "react-router-dom";
import { useState } from "react";
import AuthApi from "../../../api/AuthApi";
import { ToastContainer, toast } from "react-toastify";
import { alertConfigs } from "../../../utils/alertConfig";

const ForgetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
    },
  });
  const showAlert = (res) => {
    if (res.success) {
      toast.success(res.message, alertConfigs.success);
    } else {
      toast.error(res.message, alertConfigs.error);
    }
  };
  const handleSendResetEmail = async (data) => {
    setIsLoading(true);
    try {
      const email = {
        email: data.email,
      };
      const res = await AuthApi.sendResetPasswordRequest(email);
      showAlert(res.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response);
      showAlert(error.response);
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="full-height items-center-grid">
      <form
        onSubmit={handleSubmit(handleSendResetEmail)}
        className="login-form "
      >
        <div className="input-container">
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
              maxLength: {
                value: 40,
                message: "Email is too long",
              },
            }}
            render={({ field }) => (
              <TextInput
                placeholder={"Enter Your Email"}
                fieldValues={field}
                className={"text-input"}
              />
            )}
          />
          <span className="error-message">
            {errors?.email && errors?.email?.message}
          </span>
        </div>
        {isLoading ? (
          <ButtonLoader />
        ) : (
          <Button className={"submit-btn"} text={"Submit"}></Button>
        )}
        <p className="signup-link">
          Log in now?
          <Link to="/login">Log in</Link>
        </p>
        <ToastContainer />
      </form>
    </div>
  );
};

export default ForgetPassword;
