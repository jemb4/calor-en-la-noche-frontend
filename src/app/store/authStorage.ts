
export const saveAuth = (email: string, password: string) => {
  const token = btoa(`${email}:${password}`);
  sessionStorage.setItem("auth", token);
};

export const getAuthHeader = () => {
  const token = sessionStorage.getItem("auth");
  return token ? { Authorization: `Basic ${token}` } : {};
};

export const clearAuth = () => {
  sessionStorage.removeItem("auth");
};