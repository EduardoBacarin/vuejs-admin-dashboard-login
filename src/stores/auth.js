import { ref } from "vue";
import { defineStore } from "pinia";
import http from "@/services/http.js";
import router from "@/router";
import { useCompanyStore } from './company';

export const useAuthStore = defineStore("auth", () => {
  const token = ref(localStorage.getItem("token"));
  const user = ref(localStorage.getItem("user"));
  const userdata = ref(localStorage.getItem("userdata"));
  const isAuth = ref(false);
  const companies = useCompanyStore();

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

  function setIsAuth(auth) {
    isAuth.value = auth;
    if (!auth) setToken(false);
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
        if (res.data.status){
          localStorage.setItem("authenticated", true);
          isAuth.value = true;
        }else{
          clear();
          isAuth.value = false;
          throw new Error("Token isn't valid");
        }
      })
      .catch((error) => {
        clear();
        isAuth.value = false;
      });
  }

  function clear(){
    token.value = null;
    user.value = null;
    isAuth.value = false;
    localStorage.removeItem("token");
    localStorage.removeItem("authenticated");
    localStorage.removeItem("user");
    localStorage.removeItem("userdata");
    companies.clear();
  }

  async function logout() {
    clear();
    await http.post("auth/logout").then((res) => {
      router.push("login");
    });
  }

  return { token, user, isAuth, setToken, setUser, setUserData, setIsAuth, checkToken, logout };
});
