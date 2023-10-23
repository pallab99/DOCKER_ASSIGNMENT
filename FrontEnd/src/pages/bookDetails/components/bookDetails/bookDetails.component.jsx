/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import "./bookDetails.style.scss";
import { useEffect, useState } from "react";
import BookApi from "../../../../api/BookApi";
import Loader from "../../../../components/ui/loader/loader";
import AccordionUI from "../../../../components/ui/accordion/accordion";
import Button from "../../../../components/ui/button/button.component";
import BookReviewsComponent from "../bookReviews/bookReviews.component";
import CartApi from "../../../../api/CartApi";
import { useDispatch } from "react-redux";
import { callCartApi } from "../../../../redux/slices/cartSlice";
import useGetBookById from "../../../../hooks/book/useGetBookById";
import { ToastContainer, toast } from "react-toastify";
import { alertConfigs } from "../../../../utils/alertConfig";
import Cookies from "js-cookie";
import { isAdmin, isUser } from "../../../../helper/tokenAuthorizer";
import ButtonLoader from "../../../../components/ui/button-loader";
import { formatDate } from "../../../../helper/dateFormatter";
import GreenIcon from "./../../../../assets/checkmark.png";
const BookDetails = () => {
  const { bookId } = useParams();
  const dispatch = useDispatch();

  const { bookData, isLoading } = useGetBookById(bookId);
  const [bntClicked, setIsBtnClicked] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  useEffect(() => {
    const originalPrice = bookData?.data?.result?.price;
    const discountPrice =
      bookData?.data?.discountPrice || bookData?.data?.result?.price;
    const discountPercentage =
      ((originalPrice - discountPrice) / originalPrice) * 100;
    setDiscountPercentage(discountPercentage);
  }, [bookData]);
  console.log("discount", discountPercentage);
  const showAlert = (res) => {
    if (res.success) {
      toast.success(res.message, alertConfigs.success);
    } else {
      toast.error(res.message, alertConfigs.error);
    }
  };
  const showAlert2 = () => {
    if (token && isAdmin(token)) {
      toast.error("You can not perform this action", alertConfigs.error);
    } else {
      toast.error("You are not Logged in", alertConfigs.error);
    }
  };
  const token = Cookies.get("accessToken");
  const handleAddToCart = async () => {
    setIsBtnClicked(true);
    try {
      if (token && isUser(token)) {
        const res = await CartApi.addToCart(bookId);
        showAlert(res?.data);
      } else {
        showAlert2();
      }
      dispatch(callCartApi());
    } catch (error) {
      showAlert(error.response);
      console.log(error.response);
      setIsBtnClicked(false);
    } finally {
      setIsBtnClicked(false);
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="book-details-container">
          <div className="book-details-wrapper">
            <div className="book-image-div items-center-grid">
              <img
                src={
                  bookData?.data?.result?.image
                    ? `http://localhost:8000/${bookData?.data?.result?.image}`
                    : "https://images.saymedia-content.com/.image/t_share/MTc2Mjk0NjY1NzUzMTQyNDQ1/dummy-books-for-dummies.png"
                }
                alt={bookData?.data?.result?.title}
                className="book-img"
              />
            </div>
            <div className="book-description">
              <div className="gap-10" style={{ display: "flex" }}>
                <p className="chip">New!</p>
                {discountPercentage && !isNaN(discountPercentage) ? (
                  <p className="chip bg-red">{discountPercentage} off!</p>
                ) : (
                  ""
                )}
              </div>
              <p className="font-25 mt-10 mb-10">
                {bookData?.data?.result?.title}
              </p>
              <p className="mb-10 font-18 color-royal-blue">
                by {bookData?.data?.result?.author}
              </p>
              <strike className="mb-10 font-30 font-bold color-gray">
                Price : ${bookData?.data?.result?.price}
              </strike>
              <p className="mb-10 font-30 font-bold">
                Price : $
                {bookData?.data?.discountPrice || bookData?.data?.result?.price}
              </p>
              <p className="mb-10 font-25">
                Rating : {bookData?.data?.result?.rating} / 5
              </p>

              <p className="mb-10 font-18">
                <span className="chip">{bookData?.data?.result?.category}</span>
              </p>
              <p className="mb-10 font-18">
                {formatDate(bookData?.data?.result?.publishedAt)}
              </p>
              <div className="stock-div">
                <img src={GreenIcon} alt="" />
                <p className="font-25">
                  Stock : {bookData?.data?.result?.stock} left
                </p>
              </div>
              <div className="accordion mb-10">
                <AccordionUI
                  header={"Description"}
                  body={bookData?.data?.result?.description}
                ></AccordionUI>
              </div>
              <div className="items-center-grid">
                {bntClicked ? (
                  <ButtonLoader></ButtonLoader>
                ) : (
                  <>
                    {token && isUser(token) && (
                      <Button
                        className={"create-book-btn mt-20 "}
                        text={"Add To Cart"}
                        handleButtonClick={handleAddToCart}
                      ></Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="book-review-container">
        <BookReviewsComponent bookId={bookId}></BookReviewsComponent>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default BookDetails;
