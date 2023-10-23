import axios from "axios";
import Cookies from "js-cookie";

class Api {
  constructor() {
    this.http = axios.create({
      baseURL: "http://localhost:8000/api",
      // timeout: 8000,
      withCredentials: true,
    });
    this.handleError = this.handleError.bind(this);

    this.http.interceptors.response.use(this.handleSuccess, this.handleError);
    this.token = Cookies.get("accessToken");
  }

  handleSuccess(response) {
    return response;
  }

  async handleError(error) {
    console.log("token", this.token);
    try {
      console.log(error);
      if (
        this.token &&
        error.config.url !== "/auth/sign-up" &&
        error.response.status === 401
      ) {
        console.log(error.response);
        await this.http.post("/auth/refreshToken");
        return this.http.request(error.config);
      }
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
    const errorObj = {
      response: error?.response?.data,
      statusCode: error?.response?.status,
    };
    return Promise.reject(errorObj);
  }
}

export default new Api();
