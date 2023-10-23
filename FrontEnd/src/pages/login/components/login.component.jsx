import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthApi from "../../../api/AuthApi";
import PasswordInput from "../../../components/form/password-input/passwordInput.component";
import TextInput from "../../../components/form/text-input/textInput.component";
import Button from "../../../components/ui/button/button.component";
import { isStrongPassword } from "../../../helper/isStrongPassword";
import "./login.style.scss";
import { useForm, Controller } from "react-hook-form";
import { alertConfigs } from "../../../utils/alertConfig";
import { Link, useNavigate } from "react-router-dom";
import ButtonLoader from "../../../components/ui/button-loader";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUserData } from "../../../redux/slices/authSlice";
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const showAlert = (res) => {
    if (res.success) {
      toast.success(res.message, alertConfigs.success);
      if (res?.data.rank === 1) {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } else {
      toast.error(res.message, alertConfigs.error);
    }
  };
  const handleLogin = async (data) => {
    setIsLoading(true);
    try {
      console.log(data);
      const res = await AuthApi.signIn(data);
      console.log(res?.data);
      dispatch(addUserData(res?.data?.data));

      showAlert(res.data);
    } catch (error) {
      showAlert(error.response);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit(handleLogin)} className="login-form">
        <p className="form-title">Sign in to your account</p>

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

        <div className="input-container">
          <Controller
            name="password"
            control={control}
            rules={{
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum length must be 6",
              },
              maxLength: {
                value: 20,
                message: "Max length must be 20",
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
          <span className="error-message">
            {errors?.password && errors?.password?.message}
          </span>
        </div>
        {isLoading ? (
          <ButtonLoader />
        ) : (
          <Button className={"submit-btn"} text={"Log in"}></Button>
        )}

        <p className="signup-link">
          No account?
          <Link to="/registration">Sign up</Link>
        </p>
        <p className="signup-link mt-10">
          Forget Password?
          <Link to="/forget-password">Reset</Link>
        </p>
        <ToastContainer />
      </form>
    </div>
  );
};

export default Login;
