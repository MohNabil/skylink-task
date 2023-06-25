import axios from "axios";
import { Product } from "../types/product";
const BASE_URL = "https://dummyjson.com";

export const productsApi = axios.create({
  baseURL: BASE_URL,
});

productsApi.defaults.headers.common["Content-Type"] = "application/json";

export const getProducts = async () => {
  const response = await productsApi.get("/products");
  return response.data.products;
};

export const searchProducts = async (query: string) => {
  const response = await productsApi.get(`/products/search?q=${query}`);
  return response.data.products;
};

export const updateProduct = async (id: string, product: Product) => {
  // console.log(product, "product inside update");
  // console.log(id, "id inside update");

  const response = await productsApi.put(`/products/${id}`, product);
  return response.data;
};
