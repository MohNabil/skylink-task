import axios from "axios";
import { LoginResponse, UserCredentials } from "../types/user";
const BASE_URL = "http://localhost:3000";

export const authApi = axios.create({
  baseURL: BASE_URL,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

export const loginUserFn = async (user: UserCredentials) => {
  const response = await authApi.post<LoginResponse>("/login", user);
  return response.data;
};
