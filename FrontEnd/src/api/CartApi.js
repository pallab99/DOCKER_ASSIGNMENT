import Api from "./apiConfigs";

class CartApi {
  endPoints = {
    cartByUser: "/cart/cartByUser",
    addItemToCart: "/cart/create",
    updateBookQuantity: "/cart/update",
    removeBookFromCart: "/cart/update",
  };
  async addToCart(bookId) {
    const data = {
      book: bookId,
      quantity: 1,
    };
    return await Api.http.post(this.endPoints.addItemToCart, data);
  }
  async cartByUser() {
    return await Api.http.get(this.endPoints.cartByUser);
  }
  async increaseCartItemsByOne(bookId) {
    const data = {
      book: bookId,
      quantity: 1,
    };
    return await Api.http.post(this.endPoints.addItemToCart, data);
  }

  async decreaseCartItemsByOne(bookId) {
    const data = {
      book: bookId,
      quantity: 1,
    };
    return await Api.http.patch(this.endPoints.updateBookQuantity, data);
  }

  async removeBookFromCart(bookId, quantity) {
    const data = {
      book: bookId,
      quantity: quantity,
    };
    return await Api.http.patch(this.endPoints.removeBookFromCart, data);
  }
}

export default new CartApi();
