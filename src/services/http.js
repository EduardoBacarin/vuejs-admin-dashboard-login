import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export default AxiosInstance;
