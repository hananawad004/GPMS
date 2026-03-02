import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const sendRegisterRequest = async (data) => {
  const res = await API.post("/auth/request", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await API.post("/auth/login", data);
  return res.data;
};