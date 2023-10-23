import Api from "./apiConfigs";

class TransactionApi {
  endPoints = {
    createTransaction: "/transaction/create",
    getAllTransaction: "/transaction/all",
    getTransactionByUser: "/transaction/details",
  };
  async createTransaction(cartId, paymentMethod) {
    const data = {
      cart: cartId,
      paymentMethod,
    };
    return Api.http.post(this.endPoints.createTransaction, data);
  }

  async getAllTransaction() {
    return Api.http.get(this.endPoints.getAllTransaction);
  }
  async getTransactionByUser() {
    return await Api.http.get(this.endPoints.getTransactionByUser);
  }
}

export default new TransactionApi();
