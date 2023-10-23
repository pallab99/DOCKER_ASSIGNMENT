import Api from "./apiConfigs";

class AuthApi {
  endPoints = {
    signIn: "/auth/login",
    signUp: "/auth/sign-up",
    verifyAccount: "/auth/verify-account",
    logOut: "/auth/logOut",
    resetPasswordRequest: "/auth/sendEmailForResetPassword",
    resetPassword: "/auth/reset-password",
  };
  async signIn(data) {
    return await Api.http.post(this.endPoints.signIn, data);
  }
  async signUp(data) {
    return await Api.http.post(this.endPoints.signUp, data);
  }

  async verifyAccount(data) {
    return await Api.http.post(this.endPoints.verifyAccount, data);
  }
  async logOut() {
    return await Api.http.delete(this.endPoints.logOut);
  }

  async sendResetPasswordRequest(data) {
    return await Api.http.post(this.endPoints.resetPasswordRequest, data);
  }
  async resetPassword(data) {
    return await Api.http.post(this.endPoints.resetPassword, data);
  }
}

export default new AuthApi();
