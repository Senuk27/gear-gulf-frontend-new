import { get, post } from "../app/apiManager";

class NewService {
  static async registerUser({ email, name, password }) {
    const response = await post({
      path: "user/registration",
      requestBody: {
        email,
        name,
        password,
      },
    });
    return response;
  }

  static async login({ email, password }) {
    const response = await post({
      path: "user/login",
      requestBody: {
        email,
        password,
      },
    });
    return response;
  }

  static async saveFeedBack({ userId, feedback, userName, starValue }) {
    const response = await post({
      path: "feedback/save",
      requestBody: {
        userId,
        feedback,
        userName,
        starValue
      },
    });
    return response;
  }

  static async getAllFeedbacks() {
    const response = await get({
      path: "feedback/view",
    });
    return response;
  }
}

export default NewService;
