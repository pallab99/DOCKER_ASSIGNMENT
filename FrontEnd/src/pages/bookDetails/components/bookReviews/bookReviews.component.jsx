/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import { memo, useEffect, useState } from 'react';
import BookReviewsApi from '../../../../api/bookReviews';
import Loader from '../../../../components/ui/loader/loader';
import './bookReviews.style.scss';
import Avatar from './../../../../assets/avatar.png';
import StarRating from '../../../../components/ui/star-rating/starRating';
import Button from '../../../../components/ui/button/button.component';
import { validateReview } from '../../../../helper/reviewValidator';
import Cookies from 'js-cookie';
import { isUser } from '../../../../helper/tokenAuthorizer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { alertConfigs } from '../../../../utils/alertConfig';
import AddReview from '../addReview/addReview.components';
import ButtonLoader from '../../../../components/ui/button-loader';
import { useDispatch, useSelector } from 'react-redux';
import { callBookDetailsApi } from '../../../../redux/slices/bookReviewSlice';

const BookReview = ({ bookId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [userReview, setUserReview] = useState({});
  const [user, setUSer] = useState(false);
  const [editReviewClicked, setEditReviewClicked] = useState(false);
  const [userReviewExists, setUserReviewExists] = useState(true);
  const [reviewFound, setReviewFound] = useState(true);
  const dispatch = useDispatch();

  const [btnClicked, setBtnClicked] = useState(false);
  useEffect(() => {
    if (bookId) {
      getAllReviewsByBookId(bookId);
    }
    const token = Cookies.get('accessToken');
    if (token && isUser(token)) {
      setUSer(true);
    }
  }, [bookId, count]);
  const getAllReviewsByBookId = async (bookId) => {
    console.log('Book details api book Review page');
    try {
      setReviewFound(true);
      setLoading(true);
      const res = await BookReviewsApi.getReviewsByBookId(bookId);
      setReviews(res?.data?.data?.reviews);
      console.log('Review data', res?.data?.data?.reviews);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      setReviewFound(false);
    }
  };
  useEffect(() => {
    if (user) {
      getReviewsByUser();
    }
  }, [bookId, count, user]);
  const getReviewsByUser = async () => {
    try {
      const res = await BookReviewsApi.getReviewsByUser(bookId);
      console.log(res.data);
      setUserReview(res.data.data);
    } catch (error) {
      console.log(error.response);
      setUserReview(false);
    }
  };

  const showAlert = (res) => {
    if (res.success) {
      toast.success(res.message, alertConfigs.success);
    } else {
      toast.error(res.message, alertConfigs.error);
    }
  };

  const handleDeleteReview = async () => {
    setBtnClicked(true);
    try {
      const res = await BookReviewsApi.deleteReview(bookId);
      showAlert(res.data);

      setCount((prev) => prev + 1);
      dispatch(callBookDetailsApi());
    } catch (error) {
      setBtnClicked(false);

      console.log(error.response);
      showAlert(error.response);
    } finally {
      setBtnClicked(false);
    }
  };

  return (
    <div>
      <div className="content-center-flex gap-20">
        {user && (
          <div className="add-review">
            <AddReview
              bookId={bookId}
              editReviewClicked={editReviewClicked}
              count={count}
              setCount={setCount}
              setEditReviewClicked={setEditReviewClicked}
            />
          </div>
        )}

        {user && Object.keys(userReview).length && (
          <div className="user-review mt-20">
            <div className="your-rating-div">
              <h1>Your Review</h1>
            </div>
            <div className="reviews-desc">
              <StarRating rating={userReview?.rating}></StarRating>
              <span>Message : {userReview?.message}</span>
              <div className="review-action-btn mt-10 mb-10">
                <Button
                  className={'view-all-book-btn'}
                  text={'Edit'}
                  handleButtonClick={() => setEditReviewClicked(true)}
                ></Button>
                {btnClicked ? (
                  <ButtonLoader />
                ) : (
                  <Button
                    className={'delete-btn'}
                    text={'delete'}
                    handleButtonClick={handleDeleteReview}
                  ></Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="book-review-container">
        <h1 className="text-center mt-20 mb-20">Reviews & Ratings</h1>

        {loading ? (
          <Loader />
        ) : (
          <div className="reviews-div mb-20">
            {reviewFound &&
              reviews?.map((review) => {
                return (
                  <div className="mb-20" key={review?._id}>
                    <div className="user-name mt-10 mb-20">
                      <div className="user-avatar">
                        <img src={Avatar} alt="" className="avatar-img" />
                        <p>{review?.user?.name}</p>
                      </div>
                    </div>
                    <div className="reviews mt-10 mb-10">
                      <div className="review-rating">
                        <StarRating rating={review?.rating}></StarRating>
                      </div>
                      <p className="review-message text-bold mt-10">
                        {review?.message}
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        )}
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default memo(BookReview);
