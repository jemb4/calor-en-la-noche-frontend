import { createContext, useContext, useState } from "react";
import { clearAuth, saveAuth } from "../../app/store/authStorage";
import api from "../../app/api/axiosConfig";

type AuthContextType = {
  user: string | null;
  role: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      saveAuth(email, password);
      const response = await api.get("login");
      setUser(response.data.email || response.data.username);
      setRole(response.data.role);
      return true;
    } catch {
      clearAuth();
      return false;
    }
  };

  const logout = () => {
    clearAuth();
    setUser(null);
    setRole(null);
  };

  return(
    <AuthContext.Provider value={{ user, role, login, logout }}>
      { children }
    </AuthContext.Provider>
  )
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}