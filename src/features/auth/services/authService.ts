import axios from "axios";
import { encodeBase64 } from "./encrypt";
import API_URL from "../../../app/api/apiCalorNoche";

export interface AuthUser {
  email: string;
  role: string;
  status: string;
}

export const login = async (email: string, password: string): Promise<AuthUser> => {
  const encoded = encodeBase64(`${email}:${password}`);

  const response = await axios.get<AuthUser>(`${API_URL}/login`, {
    headers: {
      Authorization: `Basic ${encoded}`,
    },
  });

  const user = response.data;

  sessionStorage.setItem("authUser", JSON.stringify(user));
  sessionStorage.setItem("authHeader", `Basic ${encoded}`);

  return user;
};

export const getAuthUser = (): AuthUser | null => {
  const stored = sessionStorage.getItem("authUser");
  return stored ? JSON.parse(stored) : null;
};

export const getAuthHeader = (): Record<string, string> => {
  const authHeader = sessionStorage.getItem("authHeader");
  return authHeader ? { Authorization: authHeader } : {};
};

export const logout = (): void => {
  sessionStorage.removeItem("authUser");
  sessionStorage.removeItem("authHeader");
};
