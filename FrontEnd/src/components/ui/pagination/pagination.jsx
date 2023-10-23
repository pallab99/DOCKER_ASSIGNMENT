/* eslint-disable react/prop-types */
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Button from "../button/button.component";
import "./pagination.style.scss";
export default function Pagination({
  handlePrevPage,
  currentPage,
  handleNextPage,
  totalPages,
  limit,
  books,
  handlePageChange,
}) {
  // Create an array of page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination-btn-div">
      <Button
        className={"pagination-btn prev-page"}
        text={<FaArrowLeft />}
        handleButtonClick={handlePrevPage}
        disabled={currentPage === 1}
      ></Button>

      {pageNumbers.map((number) => (
        <Button
          key={number}
          className={`pagination-btn page-number ${
            currentPage === number ? "active" : ""
          }`}
          text={number}
          handleButtonClick={() => handlePageChange(number)}
        />
      ))}

      <Button
        className={"pagination-btn next-page"}
        text={<FaArrowRight />}
        handleButtonClick={handleNextPage}
        disabled={currentPage === totalPages || books.length < limit}
      ></Button>
    </div>
  );
}
