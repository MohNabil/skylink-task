import { createContext, useState } from "react";

type AuthContextProp = {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string>>;
};
export const AuthContext = createContext<AuthContextProp>({
  token: "",
  setToken: () => {},
});

type AuthProviderProp = {
  children: React.ReactNode;
};
export const AuthContextProvider = ({ children }: AuthProviderProp) => {
  // const token = localStorage.getItem("token");
  const [token, setToken] = useState("");
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
