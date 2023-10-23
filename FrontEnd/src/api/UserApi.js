import Api from "./apiConfigs";

class UserApi {
  endPoints = {
    getUserBalance: "/user/balance",
    getAllUser: "/user/all",
    updateUserById: "/user/update/",
    deleteUserById: "/user/delete/",
    addBalance: "/user/add-balance",
  };
  async getUserBalance() {
    return Api.http.get(this.endPoints.getUserBalance);
  }
  async getAllUser() {
    return Api.http.get(this.endPoints.getAllUser);
  }

  async updateUserById(userId, data) {
    return Api.http.patch(this.endPoints.updateUserById + userId, data);
  }
  async deleteUserById(userId) {
    return Api.http.delete(this.endPoints.deleteUserById + userId);
  }
  async addBalanceByUser(data) {
    return Api.http.post(this.endPoints.addBalance, data);
  }
}

export default new UserApi();
