/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import './collections.style.scss';
import Loader from '../../../../components/ui/loader/loader';
import Button from '../../../../components/ui/button/button.component';
import { useNavigate } from 'react-router-dom';
const Collections = ({ collectionBook, loading }) => {
  const navigate = useNavigate();
  const navigateToAllBooks = () => {
    navigate('/books');
  };
  const handleShowDetails = (bookId) => {
    navigate(`/book/details/${bookId}`);
  };
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="collection mt-70">
          <div className="collection-header mb-30">
            <h2 className="text-center">Books Collections</h2>
            <Button
              className={'view-all-book-btn'}
              text={'View All'}
              handleButtonClick={navigateToAllBooks}
            ></Button>
          </div>
          <div className="collection-container ">
            {collectionBook?.map((book) => {
              return (
                <div
                  key={book?._id}
                  className="card"
                  onClick={() => handleShowDetails(book._id)}
                >
                  <div className="card-img">
                    <img
                      src="https://images.saymedia-content.com/.image/t_share/MTc2Mjk0NjY1NzUzMTQyNDQ1/dummy-books-for-dummies.png"
                      alt=""
                    />
                  </div>

                  <div className="card-info">
                    <p className="book-title text-title">Name: {book?.title}</p>
                    <p className="text-body font-18">Rating : {book?.rating}</p>
                  </div>
                  <div className="card-footer">
                    <span className="text-title">Price : ${book?.price}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Collections;
