import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
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

  register(type, username, email, password) {
    return axios.post(API_URL + "signup", {
      type,
      username,
      email,
      password
    });
  }

    getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
    }
    getCurrentRole() {
        let user = JSON.parse(localStorage.getItem('user'));;
        if (user.roles[1] === "ROLE_ADMIN")
            return "Student"
        else return "Teacher";
    }
}

export default new AuthService();
