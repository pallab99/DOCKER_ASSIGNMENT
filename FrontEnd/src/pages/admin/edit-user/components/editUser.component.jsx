import { useLocation, useNavigate } from "react-router-dom";
import "./editUser.style.scss";
import { useForm, Controller } from "react-hook-form";
import TextInput from "../../../../components/form/text-input/textInput.component";
import ButtonLoader from "../../../../components/ui/button-loader";
import Button from "../../../../components/ui/button/button.component";
import { ToastContainer, toast } from "react-toastify";
import { containsSpecialChars } from "../../../../helper/isContainSpecialCharacters";
import UserApi from "../../../../api/UserApi";
import { useState } from "react";
import { alertConfigs } from "../../../../utils/alertConfig";
import SideBar from "../../dashboard/components/sideBar/sideBar.components";
import Loader from "../../../../components/ui/loader/loader";
const EditUser = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  delete state?.userData?.createdAt;
  delete state?.userData?.updatedAt;
  delete state?.userData?.__v;
  console.log(state?.userData);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: state?.userData?.email,
      name: state?.userData?.name,
      country: state?.userData?.address?.country,
      city: state?.userData?.address?.city,
      area: state?.userData?.address?.area,
      street: state?.userData?.address?.street,
      phoneNumber: state?.userData?.phoneNumber,
    },
  });
  const showAlert = (res) => {
    if (res.success) {
      toast.success(res.message, alertConfigs.success);
      setTimeout(() => {
        navigate("/user/all");
      }, 2000);
    } else {
      toast.error(res.message, alertConfigs.error);
    }
  };
  const [btnLoader, setBtnLoader] = useState(false);
  const handleUpdateUser = async (data) => {
    setBtnLoader(true);
    delete data?.balance;
    delete data?.email;
    delete data?.phoneNumber;
    const updateUserData = {
      address: {
        country: data?.country,
        city: data?.city,
        area: data?.area,
        street: data?.street,
      },
      name: data.name,
    };
    try {
      const res = await UserApi.updateUserById(
        state?.userData?._id,
        updateUserData
      );
      console.log(res.data);
      showAlert(res.data);
    } catch (error) {
      console.log(error.response);
      showAlert(error.response);
      setBtnLoader(false);
    } finally {
      setBtnLoader(false);
    }
  };

  return (
    <div className="admin-sidebar-alignment ">
      <SideBar></SideBar>
      {!state ? (
        <Loader />
      ) : (
        <div className="login-container mt-20 mb-80 max-width-600px items-center">
          <form
            onSubmit={handleSubmit(handleUpdateUser)}
            className="update-user-form width-full"
          >
            <p className="form-title">Update Existing user info</p>
            <div className="input-container">
              <p className="font-18 font-bold">User Name</p>

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
                }}
                render={({ field }) => (
                  <TextInput
                    placeholder={"Enter Your Name"}
                    fieldValues={field}
                    className={"text-input width-94"}
                  />
                )}
              />
              <span className="error-message">
                {errors.name && errors.name.message}
              </span>
            </div>

            <div className="input-container">
              <p className="font-18 font-bold">User Email</p>

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
                    className={"text-input width-94"}
                    disabled={true}
                  />
                )}
              />
              <span className="error-message">
                {errors.email && errors.email.message}
              </span>
            </div>

            <div className="input-container">
              <p className="font-18 font-bold">User Phone Number</p>

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
                    className={"text-input width-94"}
                    disabled={true}
                  />
                )}
              />
              <span className="error-message">
                {errors.phoneNumber && errors.phoneNumber.message}
              </span>
            </div>

            <div className="input-container">
              <p className="font-18 font-bold">User Country</p>

              <Controller
                name="country"
                control={control}
                rules={{
                  required: "Country is required",
                }}
                render={({ field }) => (
                  <select
                    {...field}
                    className="text-input country-select"
                    // disabled={true}
                  >
                    <option value="">Select your country</option>
                    <option value="BD">BD</option>
                    <option value="US">US</option>
                    <option value="IND">IND</option>
                  </select>
                )}
              />
              <span className="error-message">
                {errors.country && errors.country.message}
              </span>
            </div>

            <div className="input-container">
              <p className="font-18 font-bold">User City</p>

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
                }}
                render={({ field }) => (
                  <TextInput
                    placeholder={"Enter Your City"}
                    fieldValues={field}
                    className={"text-input width-94"}
                  />
                )}
              />
              <span className="error-message">
                {errors.city && errors.city.message}
              </span>
            </div>

            <div className="input-container">
              <p className="font-18 font-bold">User Area</p>

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
                  validate: (val) => {
                    if (containsSpecialChars(val)) {
                      return "Invalid value provided";
                    }
                  },
                }}
                render={({ field }) => (
                  <TextInput
                    placeholder={"Enter Your Area"}
                    fieldValues={field}
                    className={"text-input width-94"}
                  />
                )}
              />
              <span className="error-message">
                {errors.area && errors.area.message}
              </span>
            </div>

            <div className="input-container">
              <p className="font-18 font-bold">User Street</p>

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
                  validate: (val) => {
                    if (containsSpecialChars(val)) {
                      return "Invalid value provided";
                    }
                  },
                }}
                render={({ field }) => (
                  <TextInput
                    placeholder={"Enter Your street"}
                    fieldValues={field}
                    className={"text-input width-94"}
                  />
                )}
              />
              <span className="error-message">
                {errors.street && errors.street.message}
              </span>
            </div>

            {btnLoader ? (
              <ButtonLoader></ButtonLoader>
            ) : (
              <div className="content-center-flex">
                <Button className={"create-book-btn"} text={"Submit"}></Button>
              </div>
            )}

            <ToastContainer />
          </form>
        </div>
      )}
    </div>
  );
};

export default EditUser;
