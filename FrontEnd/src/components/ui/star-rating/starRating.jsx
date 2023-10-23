/* eslint-disable react/prop-types */
// StarRating.js
import './starRating.style.scss'; // You can create a CSS file for styling

const StarRating = ({ rating }) => {
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const starClassName = i <= rating ? 'star filled' : 'star empty';
      stars.push(<span key={i} className={starClassName}></span>);
    }
    return stars;
  };

  return <div className="star-rating">{renderStars()}</div>;
};

export default StarRating;
