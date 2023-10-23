import Api from "./apiConfigs";

class BookReviewsApi {
  endPoints = {
    getReviewsById: "review/details/",
    getReviewsByUser: "/review/details/user/",
    addReview: "/review/create/",
    updateReview: "/review/update/",
    deleteReview: "/review/delete/",
  };

  async getReviewsByBookId(bookId) {
    return await Api.http.get(this.endPoints.getReviewsById + bookId);
  }
  async getReviewsByUser(bookId) {
    return await Api.http.get(this.endPoints.getReviewsByUser + bookId);
  }
  async addReview(bookId, data) {
    console.log();
    return await Api.http.post(this.endPoints.addReview + bookId, data);
  }
  async updateReview(bookId, data) {
    return await Api.http.patch(this.endPoints.updateReview + bookId, data);
  }
  async deleteReview(bookId) {
    return await Api.http.delete(this.endPoints.deleteReview + bookId);
  }
}

export default new BookReviewsApi();
