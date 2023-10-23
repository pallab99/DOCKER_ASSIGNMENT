/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useForm, Controller } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import ButtonLoader from '../../../../components/ui/button-loader';
import Button from '../../../../components/ui/button/button.component';
import TextInput from '../../../../components/form/text-input/textInput.component';
import ReactStars from 'react-rating-stars-component';
import bookReviews from '../../../../api/bookReviews';
import { alertConfigs } from '../../../../utils/alertConfig';
import { useEffect, useState } from 'react';
import './addReview.style.scss';
import { useDispatch } from 'react-redux';
import { callBookDetailsApi } from '../../../../redux/slices/bookReviewSlice';
// eslint-disable-next-line react/prop-types
const AddReview = ({
  bookId,
  editReviewClicked,
  count,
  setCount,
  setEditReviewClicked,
}) => {
  const [userReview, setUserReview] = useState();
  const [ratingValue, setRatingValue] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (editReviewClicked) {
      getReviewsByUser();
    }
  }, [editReviewClicked]);

  const getReviewsByUser = async () => {
    try {
      const res = await bookReviews.getReviewsByUser(bookId);
      console.log(res.data);
      setUserReview(res.data.data);
      setValue('rating', ratingValue);
      setRatingValue(res.data.data?.rating);
      setValue('message', res.data.data.message);
    } catch (error) {
      console.log(error.response);
    }
  };
  useEffect(() => {
    setValue('rating', ratingValue);
  }, [ratingValue]);
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
    getValues,
    reset,
    resetField,
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      rating: '',
      message: '',
    },
  });
  const showAlert = (res) => {
    if (res.success) {
      toast.success(res.message, alertConfigs.success);
    } else {
      toast.error(res.message, alertConfigs.error);
    }
  };
  const handleAddReview = async (data) => {
    console.log(data);
    setLoading(true);
    try {
      if (!editReviewClicked) {
        const res = await bookReviews.addReview(bookId, data);
        showAlert(res?.data);
      } else {
        const res = await bookReviews.updateReview(bookId, data);
        showAlert(res?.data);
        setEditReviewClicked(false);
      }
      setValue('rating', 0);
      setValue('message', '');
      setRatingValue(0);
      setCount(count + 1);
      dispatch(callBookDetailsApi());
      setLoading(false);
      reset();
      resetField();
    } catch (error) {
      showAlert(error.response);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(handleAddReview)} className="login-form">
        <p className="form-title">Add Your Review</p>
        <div className="input-container">
          <Controller
            name="rating"
            control={control}
            rules={{
              required: 'Rating is required',
              min: {
                value: 1,
                message: 'Rating must be greater than 1',
              },
              max: {
                value: 5,
                message: 'Rating must be less than 5',
              },
            }}
            render={({ field }) => (
              <ReactStars
                count={5}
                size={30}
                activeColor="#ffd700"
                {...field}
                onChange={(newValue) => {
                  field.onChange(newValue); // updates value for 'rating'
                }}
                value={editReviewClicked && ratingValue}
                key={ratingValue || editReviewClicked}
              />
            )}
          />
          <span className="error-message">
            {errors?.rating && errors?.rating?.message}
          </span>
        </div>

        <div className="input-container">
          <Controller
            name="message"
            control={control}
            rules={{
              required: 'Message is required',
              minLength: {
                value: 5,
                message: 'Minimum length must be 5 characters long',
              },
              maxLength: {
                value: 200,
                message: 'Max length can not exceed 200 characters',
              },
            }}
            render={({ field }) => (
              <TextInput
                placeholder={'Enter Your Message'}
                fieldValues={field}
                className={'text-input'}
              />
            )}
          />
          <span className="error-message">
            {errors?.message && errors?.message?.message}
          </span>
        </div>
        {loading ? (
          <ButtonLoader></ButtonLoader>
        ) : (
          <Button className={'submit-btn'} text={'Submit'}></Button>
        )}
        <ToastContainer />
      </form>
    </>
  );
};

export default AddReview;
