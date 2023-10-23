/* eslint-disable react/prop-types */
export function AllBooksCard({ book, handleShowDetails }) {
  return (
    <div
      key={book?._id}
      className="card"
      onClick={() => handleShowDetails(book._id)}
    >
      <div className="card-img">
        <img
          src={
            book.image
              ? `http://localhost:8000/${book.image}`
              : "https://images.saymedia-content.com/.image/t_share/MTc2Mjk0NjY1NzUzMTQyNDQ1/dummy-books-for-dummies.png"
          }
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
}
