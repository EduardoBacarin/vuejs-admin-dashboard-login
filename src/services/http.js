import axios from "axios";

const AxiosInstance = axios.create({
  baseURL: "http://localhost:9000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default AxiosInstance;
