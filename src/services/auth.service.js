/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";

const API_URL = "https://sthenos-backend.onrender.com/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password,
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password, firstname, lastname,weight, height, age, country) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      firstname,
      lastname,
      weight,
      height,
      age,
      country
    });
  }

  // profile(weight, height, age) {
  //   return axios.post(API_URL + "profile", {
  //     weight,
  //     height,
  //     age,
  //   });
  // }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
