import Api from "./apiConfigs";

class DiscountApi {
  endPoints = {
    addNewDiscount: "/discount-price/create",
    getDiscountById: "discount-price/details/",
    updateDiscountById: "/discount-price/update/",
    getAllDiscount: "/discount-price/all",
    deleteDiscountById: "/discount-price/delete/",
  };
  async addNewDiscount(data) {
    return Api.http.post(this.endPoints.addNewDiscount, data);
  }
  async getDiscountById(discountId) {
    return Api.http.get(this.endPoints.getDiscountById + discountId);
  }
  async updateDiscountById(discountId, data) {
    return Api.http.patch(this.endPoints.updateDiscountById + discountId, data);
  }
  async getAllDiscount() {
    return Api.http.get(this.endPoints.getAllDiscount);
  }
  async deleteDiscountById(discountId) {
    return Api.http.delete(this.endPoints.deleteDiscountById + discountId);
  }
}

export default new DiscountApi();
