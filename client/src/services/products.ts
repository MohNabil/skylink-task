import axios from "axios";
const BASE_URL = "https://dummyjson.com";

export const productsApi = axios.create({
  baseURL: BASE_URL,
});

productsApi.defaults.headers.common["Content-Type"] = "application/json";

export const getProducts = async () => {
  const response = await productsApi.get("/products");
  return response.data.products;
};
