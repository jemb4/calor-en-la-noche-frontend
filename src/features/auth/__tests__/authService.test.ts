import axios from "axios";
import {
  login,
  getAuthUser,
  getAuthHeader,
  logout,
  type AuthUser,
} from "../services/authService";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";

const mockSessionStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => (store[key] = value),
    removeItem: (key: string) => delete store[key],
    clear: () => (store = {}),
  };
})();

Object.defineProperty(window, "sessionStorage", {
  value: mockSessionStorage,
});

vi.mock("axios");
const mockedAxios = axios as unknown as {
  get: ReturnType<typeof vi.fn>;
};

describe("authService", () => {
  const mockUser: AuthUser = {
    email: "test@example.com",
    role: "USER",
    status: "ACTIVE",
  };

  beforeEach(() => {
    vi.resetAllMocks();
    sessionStorage.clear();
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  it("login debe codificar credenciales, hacer llamada axios y guardar sesión", async () => {
    mockedAxios.get = vi.fn().mockResolvedValue({ data: mockUser });

    const result = await login("test@example.com", "secret");

    expect(mockedAxios.get).toHaveBeenCalledWith(
      expect.stringContaining("/login"),
      expect.objectContaining({
        headers: {
          Authorization: expect.stringMatching(/^Basic /),
        },
      })
    );

    expect(result).toEqual(mockUser);
    expect(sessionStorage.getItem("authUser")).toBe(JSON.stringify(mockUser));
    expect(sessionStorage.getItem("authHeader")).toMatch(/^Basic /);
  });

  it("getAuthUser debe devolver el usuario desde sessionStorage", () => {
    sessionStorage.setItem("authUser", JSON.stringify(mockUser));

    const stored = getAuthUser();
    expect(stored).toEqual(mockUser);
  });

  it("getAuthUser debe devolver null si no hay usuario guardado", () => {
    sessionStorage.clear();
    expect(getAuthUser()).toBeNull();
  });

  it("getAuthHeader debe devolver Authorization header si existe", () => {
    sessionStorage.setItem("authHeader", "Basic ABC123");
    expect(getAuthHeader()).toEqual({ Authorization: "Basic ABC123" });
  });

  it("getAuthHeader debe devolver objeto vacío si no existe header", () => {
    sessionStorage.clear();
    expect(getAuthHeader()).toEqual({});
  });

  it("logout debe limpiar sessionStorage", () => {
    sessionStorage.setItem("authUser", "data");
    sessionStorage.setItem("authHeader", "header");

    logout();

    expect(sessionStorage.getItem("authUser")).toBeNull();
    expect(sessionStorage.getItem("authHeader")).toBeNull();
  });
});
