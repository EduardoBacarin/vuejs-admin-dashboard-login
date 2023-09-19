import { ref } from "vue";
import { defineStore } from "pinia";
import http from "@/services/http.js";
import router from "@/router";

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token"));
  const user = ref(localStorage.getItem("user"));

  function setToken(tokenValue) {
    localStorage.setItem("token", tokenValue);
    token.value = tokenValue;
  }

  function setUser(userValue) {
    localStorage.setItem("user", userValue);
    user.value = userValue;
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
        if (res.data) {
          localStorage.setItem("authenticated", true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function logout() {
    token.value = null;
    user.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("login");
  }

  return { token, user, setToken, setUser, checkToken, logout };
});
