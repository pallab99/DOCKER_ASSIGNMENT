/* eslint-disable react/prop-types */
import "./select.style.scss";
export default function SortSelect({
  toggleSortBy,
  sortBy,
  toggleSortOrder,
  sortOrder,
}) {
  return (
    <div className="sort-book-div mb-20">
      <div className="all-book-header font-18 font-bold">All Books</div>
      <div className="sort-by-div">
        <div className="font-18 font-bold color-gray">Sort By : </div>
        <select
          name="sortBy"
          id="sortBy"
          className="sort-select"
          onChange={toggleSortBy}
        >
          <option value="">
            {sortBy === "stock"
              ? "Stock"
              : sortBy === "price"
              ? "Price"
              : sortBy === "rating"
              ? "Rating"
              : "Choose"}
          </option>
          <option value="stock">stock</option>
          <option value="price">price</option>
          <option value="rating">rating</option>
        </select>
        <select
          name="sortOrder"
          id="sortOrder"
          className="sort-select"
          onChange={toggleSortOrder}
        >
          <option value="">
            {sortOrder === "asc"
              ? "Ascending"
              : sortOrder === "desc"
              ? "Descending"
              : "Choose"}
          </option>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
    </div>
  );
}
