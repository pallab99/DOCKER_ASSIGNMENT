import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { alertConfigs } from "../../../utils/alertConfig";
import { ToastContainer, toast } from "react-toastify";
import AuthApi from "../../../api/AuthApi";
import TextInput from "../../../components/form/text-input/textInput.component";
import Button from "../../../components/ui/button/button.component";
import "react-toastify/dist/ReactToastify.css";
import { isStrongPassword } from "../../../helper/isStrongPassword";
import PasswordInput from "../../../components/form/password-input/passwordInput.component";
import "./registration.style.scss";
import { useState } from "react";
import ButtonLoader from "../../../components/ui/button-loader";
import { containsSpecialChars } from "../../../helper/isContainSpecialCharacters";
const Registration = () => {
  const navigate = useNavigate();
  const [btnLoader, setBtnLoader] = useState(false);
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      name: "",
      confirmPassword: "",
      country: "",
      city: "",
      area: "",
      street: "",
      phoneNumber: "",
    },
  });

  const showAlert = (res) => {
    if (res.success) {
      toast.success("Created account successfully", alertConfigs.success);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } else {
      toast.error(res.message, alertConfigs.error);
    }
  };

  const handleSignUp = async (data) => {
    const userData = {
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
      name: data.name,
      phoneNumber: data.phoneNumber,
      address: {
        country: data.country,
        city: data.city,
        area: data.area,
        street: data.street,
      },
    };
    setBtnLoader(true);
    try {
      const res = await AuthApi.signUp(userData);
      showAlert(res.data);
    } catch (error) {
      showAlert(error.response);
    } finally {
      setBtnLoader(false);
    }
  };

  return (
    <div className="login-container mt-20 full-height mb-200">
      <form onSubmit={handleSubmit(handleSignUp)} className="login-form">
        <p className="form-title">Sign up for your account</p>
        <div className="input-container mt-10 mb-10">
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Name is required",
              pattern: {
                value: /^[a-zA-Z0-9\s]*$/,
                message: "Invalid Name Provided",
              },
              minLength: {
                value: 5,
                message: "Name cannot be less than 5 characters",
              },
              maxLength: {
                value: 50,
                message: "Name cannot be greater than 50 characters",
              },
              validate: (value) => {
                if (containsSpecialChars(value)) {
                  return "Invalid value provided";
                }
                return true;
              },
            }}
            render={({ field }) => (
              <TextInput
                placeholder={"Enter Your Name"}
                fieldValues={field}
                className={"text-input"}
              />
            )}
          />
          <span className="error-message mt-5 mb-5">
            {errors.name && errors.name.message}
          </span>
        </div>

        <div className="input-container mt-10 mb-10">
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
          <span className="error-message mt-5 mb-5">
            {errors.email && errors.email.message}
          </span>
        </div>

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

        <div className="input-container mt-10 mb-10">
          <Controller
            name="phoneNumber"
            control={control}
            rules={{
              required: "Phone Number is required",
              pattern: {
                value: /^(?:\+88|01)?\d{11}$/,
                message: "Please enter a valid Phone Number.",
              },
            }}
            render={({ field }) => (
              <TextInput
                placeholder={"Enter Your Phone Number"}
                fieldValues={field}
                className={"text-input"}
              />
            )}
          />
          <span className="error-message mt-5 mb-5">
            {errors.phoneNumber && errors.phoneNumber.message}
          </span>
        </div>

        <div className="input-container mt-10 mb-10">
          <Controller
            name="country"
            control={control}
            rules={{
              required: "Country is required",
              validate: (value) => {
                if (containsSpecialChars(value)) {
                  return "Invalid value provided";
                }
                return true;
              },
            }}
            render={({ field }) => (
              <select {...field} className="text-input country-select">
                <option value="">Select your country</option>
                <option value="BD">BD</option>
                <option value="US">US</option>
                <option value="IND">IND</option>
              </select>
            )}
          />
          <span className="error-message mt-5 mb-5">
            {errors.country && errors.country.message}
          </span>
        </div>

        <div className="input-container mt-10 mb-10">
          <Controller
            name="city"
            control={control}
            rules={{
              required: "city is required",
              pattern: {
                value: /^[a-zA-Z0-9\s]*$/,
                message: "Invalid Value Provided",
              },
              minLength: {
                value: 3,
                message: "City name must be 3 character long",
              },
              maxLength: {
                value: 20,
                message: "City name can not be greater than 20 characters",
              },
              validate: (value) => {
                if (containsSpecialChars(value)) {
                  return "Invalid value provided";
                }
                return true;
              },
            }}
            render={({ field }) => (
              <TextInput
                placeholder={"Enter Your City"}
                fieldValues={field}
                className={"text-input"}
              />
            )}
          />
          <span className="error-message mt-5 mb-5">
            {errors.city && errors.city.message}
          </span>
        </div>

        <div className="input-container mt-10 mb-10">
          <Controller
            name="area"
            control={control}
            rules={{
              required: "Area is required",

              minLength: {
                value: 3,
                message: "Area name must be 3 character long",
              },
              maxLength: {
                value: 20,
                message: "Area name can not be greater than 20 characters",
              },
            }}
            render={({ field }) => (
              <TextInput
                placeholder={"Enter Your Area"}
                fieldValues={field}
                className={"text-input"}
              />
            )}
          />
          <span className="error-message mt-5 mb-5">
            {errors.area && errors.area.message}
          </span>
        </div>

        <div className="input-container mt-10 mb-10">
          <Controller
            name="street"
            control={control}
            rules={{
              required: "Road is required",

              minLength: {
                value: 3,
                message: "Road name must be 3 character long",
              },
              maxLength: {
                value: 20,
                message: "Road name can not be greater than 20 characters",
              },
            }}
            render={({ field }) => (
              <TextInput
                placeholder={"Enter Your street"}
                fieldValues={field}
                className={"text-input"}
              />
            )}
          />
          <span className="error-message mt-5 mb-5">
            {errors.street && errors.street.message}
          </span>
        </div>

        {btnLoader ? (
          <ButtonLoader></ButtonLoader>
        ) : (
          <Button className={"submit-btn"} text={"Register"}></Button>
        )}
        <p className="signup-link">
          Already have an account?
          <Link to="/login">Log in</Link>
        </p>
        <ToastContainer />
      </form>
    </div>
  );
};

export default Registration;
