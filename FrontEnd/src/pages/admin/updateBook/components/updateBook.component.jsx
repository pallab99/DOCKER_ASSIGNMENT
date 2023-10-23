/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import BookApi from "../../../../api/BookApi";
import Cookies from "js-cookie";
import { isAdmin } from "../../../../helper/tokenAuthorizer";
import { ToastContainer, toast } from "react-toastify";
import { alertConfigs } from "../../../../utils/alertConfig";
import TextInput from "../../../../components/form/text-input/textInput.component";
import Button from "../../../../components/ui/button/button.component";
import { containsSpecialChars } from "../../../../helper/isContainSpecialCharacters";
import Loader from "../../../../components/ui/loader/loader";
import useGetBookById from "../../../../hooks/book/useGetBookById";
import SideBar from "../../dashboard/components/sideBar/sideBar.components";
import ButtonLoader from "../../../../components/ui/button-loader";

const UpdateBook = () => {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const [updateBook, setUpdateBook] = useState(null);
  const { bookData, isLoading } = useGetBookById(bookId);
  const [admin, setAdmin] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);
  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      const res = isAdmin(token);
      if (res === true) {
        setAdmin(true);
      } else {
        navigate("*");
      }
      if (bookData) {
        setUpdateBookData();
      }
    }
  }, [bookData, navigate]);

  const setUpdateBookData = () => {
    setUpdateBook({
      title: bookData?.data?.result?.title,
      description: bookData?.data?.result?.description,
      price: bookData?.data?.result?.price,
      rating: bookData?.data?.result?.rating,
      stock: bookData?.data?.result?.stock,
      author: bookData?.data?.result?.author,
      category: bookData?.data?.result?.category,
      publishedAt: bookData?.data?.result?.publishedAt.split("T")[0],
      isbn: bookData?.data?.result?.isbn,
    });
  };
  const { handleSubmit, setValue, formState, control } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      description: "",
      price: "",
      rating: "",
      stock: "",
      author: "",
      category: "",
      publishedAt: "",
      isbn: "",
    },
  });
  const { errors } = formState;

  useEffect(() => {
    if (updateBook) {
      for (const [key, value] of Object.entries(updateBook)) {
        setValue(key, value);
      }
    }
  }, [updateBook, setValue]);

  const showAlert = (res) => {
    if (res.success) {
      toast.success(res.message, alertConfigs.success);
      setTimeout(() => {
        navigate(`/admin/dashboard`);
      }, 2000);
    } else {
      toast.error(res.message, alertConfigs.error);
    }
  };
  const handleUpdateBook = async (data) => {
    setBtnClicked(true);
    try {
      const bookData = {
        ...data,
        price: Number(data?.price),
        stock: Number(data?.stock),
        rating: Number(data?.rating),
      };
      const res = await BookApi.updateBookById(bookId, bookData);
      console.log(res.data);
      showAlert(res.data);
    } catch (error) {
      showAlert(error.response);
      console.log(error.response);
      setBtnClicked(false);
    } finally {
      setBtnClicked(false);
    }
  };
  return (
    <div className="admin-sidebar-alignment">
      <SideBar></SideBar>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="create-book-container mt-20 mb-20">
          <div className="create-book-header mb-20">
            <span className="font-30 font-bold">Update An Existing book</span>
            <span className="font-18 mb-10 mt-5">
              Update information of a book
            </span>
          </div>
          <form
            onSubmit={handleSubmit(handleUpdateBook)}
            className="create-book-form"
          >
            <div className="create-book-input-container">
              <p className="font-18 font-bold mb-5">Book Title</p>
              <Controller
                name="title"
                control={control}
                rules={{
                  required: "title is required",
                  minLength: {
                    value: 3,
                    message: "Title length must be minimum 3",
                  },
                  maxLength: {
                    value: 50,
                    message: "Title length can not be greater than 50",
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
                    placeholder={"Enter Your title"}
                    fieldValues={field}
                    className={"text-input"}
                  />
                )}
              />
              <span className="error-message mt-5 mb-5">
                {errors.title && errors.title.message}
              </span>
            </div>

            <div className="create-book-input-container">
              <p className="font-18 font-bold mb-5">Book Description</p>
              <Controller
                name="description"
                control={control}
                rules={{
                  required: "description is required",
                  minLength: {
                    value: 15,
                    message: "Description length must be minimum 15",
                  },
                  maxLength: {
                    value: 200,
                    message: "Description length can not be greater than 200",
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
                    placeholder={"Enter Your description"}
                    fieldValues={field}
                    className={"text-input"}
                  />
                )}
              />
              <span className="error-message mt-5 mb-5 error-description">
                {errors.description && errors.description.message}
              </span>
            </div>

            <div className="create-book-input-container">
              <p className="font-18 font-bold mb-5">Book Price</p>
              <Controller
                name="price"
                control={control}
                rules={{
                  valueAsNumber: true,
                  required: "Price is required",
                  min: {
                    value: 10,
                    message: "Price can not be less than 10",
                  },
                  max: {
                    value: 10000,
                    message: "Price can not be greater than 10000",
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
                    placeholder={"Enter Your price"}
                    fieldValues={field}
                    className={"text-input"}
                    type="number"
                  />
                )}
              />
              <span className="error-message mt-5 mb-5">
                {errors.price && errors.price.message}
              </span>
            </div>

            <div className="create-book-input-container">
              <p className="font-18 font-bold mb-5">Book Rating</p>
              <Controller
                name="rating"
                control={control}
                rules={{
                  valueAsNumber: true,
                  required: "Rating is required",
                  min: {
                    value: 1,
                    message: "Rating can not be less than 1",
                  },
                  max: {
                    value: 5,
                    message: "Rating can not be greater than 5",
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
                    placeholder={"Enter Your rating"}
                    fieldValues={field}
                    className={"text-input"}
                    type="number"
                  />
                )}
              />
              <span className="error-message mt-5 mb-5">
                {errors.rating && errors.rating.message}
              </span>
            </div>

            <div className="create-book-input-container">
              <p className="font-18 font-bold mb-5">Book Stock</p>

              <Controller
                name="stock"
                control={control}
                rules={{
                  valueAsNumber: true,
                  required: "Stock is required",
                  min: {
                    value: 10,
                    message: "Stock can not be less than 10",
                  },
                  max: {
                    value: 500,
                    message: "Stock can not be greater than 500",
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
                    placeholder={"Enter Your stock"}
                    fieldValues={field}
                    className={"text-input"}
                    type="number"
                  />
                )}
              />
              <span className="error-message mt-5 mb-5">
                {errors.stock && errors.stock.message}
              </span>
            </div>

            <div className="create-book-input-container">
              <p className="font-18 font-bold mb-5">Book Author</p>

              <Controller
                name="author"
                control={control}
                rules={{
                  required: "author is required",
                  validate: (value) => {
                    if (containsSpecialChars(value)) {
                      return "Invalid value provided";
                    }
                    return true;
                  },
                }}
                render={({ field }) => (
                  <TextInput
                    placeholder={"Enter Your author"}
                    fieldValues={field}
                    className={"text-input"}
                  />
                )}
              />
              <span className="error-message mt-5 mb-5">
                {errors.author && errors.author.message}
              </span>
            </div>

            <div className="create-book-input-container">
              <p className="font-18 font-bold mb-5">Book Category</p>

              <Controller
                name="category"
                control={control}
                rules={{
                  required: "category is required",
                  validate: (value) => {
                    if (containsSpecialChars(value)) {
                      return "Invalid value provided";
                    }
                    return true;
                  },
                }}
                render={({ field }) => (
                  <TextInput
                    placeholder={"Enter Your category"}
                    fieldValues={field}
                    className={"text-input"}
                  />
                )}
              />
              <span className="error-message mt-5 mb-5">
                {errors.category && errors.category.message}
              </span>
            </div>

            <div className="create-book-input-container">
              <p className="font-18 font-bold mb-5">Book Published Date</p>

              <Controller
                name="publishedAt"
                control={control}
                rules={{
                  required: "publishedAt is required",
                  validate: (value) => {
                    if (containsSpecialChars(value)) {
                      return "Invalid value provided";
                    }
                    return true;
                  },
                }}
                render={({ field }) => (
                  <TextInput
                    placeholder={"Enter Your publishedAt"}
                    fieldValues={field}
                    className={"text-input"}
                    type="date"
                  />
                )}
              />
              <span className="error-message mt-5 mb-5">
                {errors.publishedAt && errors.publishedAt.message}
              </span>
            </div>

            <div className="create-book-input-container">
              <p className="font-18 font-bold mb-5">Book ISBN Number</p>

              <Controller
                name="isbn"
                control={control}
                rules={{
                  required: "isbn is required",
                }}
                render={({ field }) => (
                  <TextInput
                    placeholder={"Enter Your isbn"}
                    fieldValues={field}
                    className={"text-input"}
                    disabled={true}
                  />
                )}
              />
              <span className="error-message mt-5 mb-5">
                {errors.isbn && errors.isbn.message}
              </span>
            </div>
            {btnClicked ? (
              <ButtonLoader />
            ) : (
              <Button
                className={"create-book-btn mt-22"}
                text={"Update Book"}
              ></Button>
            )}
          </form>
          <ToastContainer />
        </div>
      )}
    </div>
  );
};

export default UpdateBook;
