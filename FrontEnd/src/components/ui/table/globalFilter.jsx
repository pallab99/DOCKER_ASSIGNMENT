/* eslint-disable react/prop-types */
import "./globalFilter.style.scss";

const GlobalFilter = ({ filter, setFilter }) => {
  return (
    <>
      <span>
        <input
          placeholder="Enter your search here...."
          className="all-book-input mt-5 mb-10"
          value={filter || ""}
          onChange={(e) => setFilter(e.target.value)}
        />
      </span>
    </>
  );
};

export default GlobalFilter;
