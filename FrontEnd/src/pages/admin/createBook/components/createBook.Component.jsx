import { useForm, Controller } from 'react-hook-form';
import TextInput from '../../../../components/form/text-input/textInput.component';
import { useNavigate } from 'react-router-dom';
import './createBook.style.scss';
import Button from '../../../../components/ui/button/button.component';
import BookApi from '../../../../api/BookApi';
import { alertConfigs } from '../../../../utils/alertConfig';
import { ToastContainer, toast } from 'react-toastify';
import { isValidISBN } from './../../../../helper/isValidISBN';
import { containsSpecialChars } from '../../../../helper/isContainSpecialCharacters';
import Cookies from 'js-cookie';
import { isAdmin } from '../../../../helper/tokenAuthorizer';
import SideBar from '../../dashboard/components/sideBar/sideBar.components';
import { useState } from 'react';
import ButtonLoader from '../../../../components/ui/button-loader';
const CreateBook = () => {
  const navigate = useNavigate();
  const [btnClicked, setBtnClicked] = useState(false);
  const token = Cookies.get('accessToken');
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      price: '',
      rating: '',
      stock: '',
      author: '',
      category: '',
      publishedAt: '',
      isbn: '',
      file_to_upload: '',
    },
  });
  const showAlert = (res) => {
    console.log('alert', res);
    if (res.success) {
      toast.success(res.message, alertConfigs.success);
      setTimeout(() => {
        navigate('/admin/dashboard');
      }, 2000);
    } else {
      toast.error(res.message, alertConfigs.error);
    }
  };
  const handleCreateBook = async (data) => {
    if (!isAdmin(token)) {
      console.log('Hello');
      navigate('*');
      return;
    }
    setBtnClicked(true);
    try {
      const bookData = {
        ...data,
        price: Number(data?.price),
        stock: Number(data?.stock),
        rating: Number(data?.rating),
      };

      const formData = new FormData();
      console.log('bookdata', bookData);
      formData.append('title', bookData?.title);
      formData.append('description', bookData?.description);
      formData.append('author', bookData?.author);
      formData.append('price', bookData?.price);
      formData.append('rating', bookData?.rating);
      formData.append('stock', bookData?.stock);
      formData.append('category', bookData?.category);
      formData.append('publishedAt', bookData?.publishedAt);
      formData.append('isbn', bookData?.isbn);
      formData.append('file_to_upload', bookData?.file_to_upload);

      const res = await BookApi.createBook(formData);
      console.log(res.data);
      showAlert(res.data);
    } catch (error) {
      console.log(error);
      showAlert(error.response);
      setBtnClicked(false);
    } finally {
      setBtnClicked(false);
    }
  };
  return (
    <div className="admin-sidebar-alignment">
      <SideBar />
      <div className="create-book-container mt-20 mb-20">
        <div className="create-book-header mb-20">
          <span className="font-30 font-bold">Add a new book</span>
          <span className="font-18 mb-10">Add information about a book</span>
        </div>
        <form
          onSubmit={handleSubmit(handleCreateBook)}
          className="create-book-form"
        >
          <div className="create-book-input-container">
            <p className="font-18 font-bold mb-5">Book Title</p>

            <Controller
              name="title"
              control={control}
              rules={{
                required: 'title is required',
                minLength: {
                  value: 3,
                  message: 'Title length must be minimum 3',
                },
                maxLength: {
                  value: 50,
                  message: 'Title length can not be greater than 50',
                },
                validate: (value) => {
                  if (containsSpecialChars(value)) {
                    return 'Invalid value provided';
                  }
                  return true;
                },
              }}
              render={({ field }) => (
                <TextInput
                  placeholder={'Enter Your title'}
                  fieldValues={field}
                  className={'text-input'}
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
                required: 'description is required',
                minLength: {
                  value: 15,
                  message: 'Description length must be minimum 15',
                },
                maxLength: {
                  value: 200,
                  message: 'Description length can not be greater than 200',
                },
                validate: (value) => {
                  if (containsSpecialChars(value)) {
                    return 'Invalid value provided';
                  }
                  return true;
                },
              }}
              render={({ field }) => (
                <TextInput
                  placeholder={'Enter Your description'}
                  fieldValues={field}
                  className={'text-input'}
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
                required: 'Price is required',
                min: {
                  value: 10,
                  message: 'Price can not be less than 10',
                },
                max: {
                  value: 10000,
                  message: 'Price can not be greater than 10000',
                },
                validate: (value) => {
                  if (containsSpecialChars(value)) {
                    return 'Invalid value provided';
                  }
                  return true;
                },
              }}
              render={({ field }) => (
                <TextInput
                  placeholder={'Enter Your price'}
                  fieldValues={field}
                  className={'text-input'}
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
                required: 'Rating is required',
                min: {
                  value: 1,
                  message: 'Rating can not be less than 1',
                },
                max: {
                  value: 5,
                  message: 'Rating can not be greater than 5',
                },
                validate: (value) => {
                  if (containsSpecialChars(value)) {
                    return 'Invalid value provided';
                  }
                  return true;
                },
              }}
              render={({ field }) => (
                <TextInput
                  placeholder={'Enter Your rating'}
                  fieldValues={field}
                  className={'text-input'}
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
                required: 'Stock is required',
                min: {
                  value: 10,
                  message: 'Stock can not be less than 10',
                },
                max: {
                  value: 500,
                  message: 'Stock can not be greater than 500',
                },
                validate: (value) => {
                  if (containsSpecialChars(value)) {
                    return 'Invalid value provided';
                  }
                  return true;
                },
              }}
              render={({ field }) => (
                <TextInput
                  placeholder={'Enter Your stock'}
                  fieldValues={field}
                  className={'text-input'}
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
                required: 'author is required',
                validate: (value) => {
                  if (containsSpecialChars(value)) {
                    return 'Invalid value provided';
                  }
                  return true;
                },
              }}
              render={({ field }) => (
                <TextInput
                  placeholder={'Enter Your author'}
                  fieldValues={field}
                  className={'text-input'}
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
                required: 'category is required',
                validate: (value) => {
                  if (containsSpecialChars(value)) {
                    return 'Invalid value provided';
                  }
                  return true;
                },
              }}
              render={({ field }) => (
                <TextInput
                  placeholder={'Enter Your category'}
                  fieldValues={field}
                  className={'text-input'}
                />
              )}
            />
            <span className="error-message mt-5 mb-5">
              {errors.category && errors.category.message}
            </span>
          </div>

          <div className="create-book-input-container">
            <p className="font-18 font-bold mb-5">Book Published date</p>

            <Controller
              name="publishedAt"
              control={control}
              rules={{
                required: 'publishedAt is required',
                validate: (value) => {
                  if (containsSpecialChars(value)) {
                    return 'Invalid value provided';
                  }
                  return true;
                },
              }}
              render={({ field }) => (
                <TextInput
                  placeholder={'Enter Your publishedAt'}
                  fieldValues={field}
                  className={'text-input'}
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
                required: 'isbn is required',
                validate: (value) => {
                  if (!isValidISBN(value)) {
                    return 'Invalid ISBN provided';
                  }
                  return true;
                },
              }}
              render={({ field }) => (
                <TextInput
                  placeholder={'Enter Your isbn'}
                  fieldValues={field}
                  className={'text-input'}
                />
              )}
            />
            <span className="error-message mt-5 mb-5">
              {errors.isbn && errors.isbn.message}
            </span>
          </div>

          <div className="create-book-input-container">
            <p className="font-18 font-bold mb-5">Book Image</p>

            <Controller
              control={control}
              name={'file_to_upload'}
              rules={{
                required: 'picture is required',
                validate: (value) => {
                  const extension = value.name.split('.')[1];
                  if (
                    !['png', 'jpg', 'jpeg'].includes(extension.toLowerCase())
                  ) {
                    return 'Only .png, .jpg, and .jpeg file types are allowed';
                  }
                },
              }}
              render={({ field: { value, onChange, ...field } }) => {
                return (
                  <input
                    className="text-input"
                    {...field}
                    value={value?.fileName}
                    onChange={(event) => {
                      onChange(event.target.files[0]);
                    }}
                    type="file"
                    id="file_to_upload"
                    accept=".jpg, .jpeg, .png"
                  />
                );
              }}
            />
            <span className="error-message mt-5 mb-5">
              {errors.file_to_upload && errors.file_to_upload.message}
            </span>
          </div>

          {btnClicked ? (
            <ButtonLoader />
          ) : (
            <Button
              className={'create-book-btn mt-22'}
              text={'Create Book'}
            ></Button>
          )}
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default CreateBook;
