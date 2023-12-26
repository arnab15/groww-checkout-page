import axios from "axios";
const API_URL =
  "https://groww-intern-assignment.vercel.app/v1/api/order-details";
export const getOrderDetails = () => {
  return axios.get(API_URL);
};
