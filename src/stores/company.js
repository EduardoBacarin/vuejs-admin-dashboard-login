import { ref } from "vue";
import { defineStore } from "pinia";
import http from "@/services/http.js";
import router from "@/router";

export const useCompanyStore = defineStore("company", () => {
  const companies = ref(localStorage.getItem("companies"));

  function setCompanies(companiesData){
    localStorage.setItem("companies", JSON.stringify(companiesData));
    companies.value = companiesData;
  }

  function clear(){
    companies.value = false;
    localStorage.removeItem("companies");
  }

  return { companies, setCompanies, clear };
});
