import { ref } from "vue";
import { defineStore } from "pinia";
import http from "@/services/http.js";
import router from "@/router";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token"));
  const user = ref(localStorage.getItem("user"));
  const userdata = ref(localStorage.getItem("userdata"));

  function setToken(tokenValue) {
    localStorage.setItem("token", tokenValue);
    token.value = tokenValue;
  }

  function setUser(userValue) {
    localStorage.setItem("user", userValue);
    user.value = userValue;
  }

  function setUserData(userDataValue) {
    localStorage.setItem("userdata", JSON.stringify(userDataValue));
    userdata.value = userDataValue;
  }

  async function checkToken() {
    const tokenAuth = "Bearer " + token.value;
    let valid = false;
    await http
      .get("auth/verify", {
        headers: {
          Authorization: tokenAuth,
        },
      })
      .then((res) => {
        localStorage.setItem("authenticated", res.data.status);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function logout() {
    token.value = null;
    user.value = null;
    await http.post("auth/logout").then((res) => {
      localStorage.removeItem("token");
      localStorage.removeItem("authenticated");
      localStorage.removeItem("user");
      localStorage.removeItem("userdata");
      localStorage.removeItem("companies");
      router.push("login");
    });
  }

  return { token, user, setToken, setUser, setUserData, checkToken, logout };
});
