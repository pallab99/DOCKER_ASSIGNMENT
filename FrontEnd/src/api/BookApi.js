import Api from "./apiConfigs";

class BookApi {
  endPoints = {
    getAll: "/books/all",
    getBookById: "books/details/",
    createBook: "/books/create",
    updateBookById: "/books/update/",
    deleteBookById: "/books/delete/",
    getAllAuthors: "/books/author/all",
  };
  async getAllBooks(
    offset = 1,
    limit = 8,
    searchTerm,
    sortBy,
    sortOrder,
    filterValue,
    authorFilterValue
  ) {
    console.log("api", filterValue);
    let queryParams = `?offset=${offset}&limit=${limit}`;

    if (searchTerm) {
      queryParams += queryParams ? "&" : "?";
      queryParams += `search=${searchTerm}`;
    }

    if (sortBy && sortOrder) {
      queryParams += queryParams ? "&" : "?";
      queryParams += `sortBy=${sortBy}&sortOrder=${sortOrder}`;
    }
    if (filterValue.length > 0) {
      queryParams += queryParams ? "&" : "?";
      queryParams += `category=${filterValue}`;
    }
    if (authorFilterValue.length > 0) {
      queryParams += queryParams ? "&" : "?";
      queryParams += `author=${authorFilterValue}`;
    }
    console.log(queryParams);
    return await Api.http.get(this.endPoints.getAll + queryParams);
  }

  async getBookById(id) {
    return await Api.http.get(this.endPoints.getBookById + id);
  }

  async createBook(data) {
    return await Api.http.post(this.endPoints.createBook, data);
  }

  async deleteBookById(id) {
    return await Api.http.delete(this.endPoints.deleteBookById + id);
  }

  async updateBookById(id, data) {
    return await Api.http.patch(this.endPoints.updateBookById + id, data);
  }
  async getFeaturedBook() {
    return await Api.http.get(this.endPoints.getAll + "?offset=1&limit=6");
  }
  async getAllBooksAdmin() {
    return await Api.http.get(this.endPoints.getAll);
  }
  async getAllAuthors() {
    return await Api.http.get(this.endPoints.getAllAuthors);
  }
}

export default new BookApi();
