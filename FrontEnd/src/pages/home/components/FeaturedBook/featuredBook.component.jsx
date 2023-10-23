/* eslint-disable react/prop-types */
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./featuredBook.style.scss";
import Loader from "../../../../components/ui/loader/loader";
import { useNavigate } from "react-router-dom";
const FeaturedBook = ({ featuredBook, loading }) => {
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  const handleShowDetails = (bookId) => {
    navigate(`/book/details/${bookId}`);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="featured-book-container">
          <h2 className="text-center mb-10"> Featured Book </h2>
          <Slider {...settings}>
            {featuredBook?.map((book, index) => (
              <div
                key={index}
                className="featured-book-div text-center"
                onClick={() => handleShowDetails(book._id)}
              >
                <img
                  className="book-image"
                  src={
                    book.image
                      ? book.image
                      : "https://images.saymedia-content.com/.image/t_share/MTc2Mjk0NjY1NzUzMTQyNDQ1/dummy-books-for-dummies.png"
                  }
                  alt={book.name}
                />
                <p className="book-title text-center font-18 mt-10">
                  {book.title}
                </p>
                <p className="text-center font-18 mt-10">{book.price}</p>
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
};

export default FeaturedBook;
