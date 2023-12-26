import axios from "axios";
const API_URL =
  "https://groww-intern-assignment.vercel.app/v1/api/merchant-metadata";
export const getBrandDetails = () => {
  return axios.get(API_URL);
};
