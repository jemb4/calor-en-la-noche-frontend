import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthProvider, useAuth } from "../AuthContext";
import * as authStorage from "../../../app/store/authStorage";
import api from "../../../app/api/axiosConfig";
import { MemoryRouter } from "react-router-dom";

vi.mock("../../../app/store/authStorage", () => ({
  saveAuth: vi.fn(),
  clearAuth: vi.fn(),
}));

vi.mock("../../../app/api/axiosConfig", () => ({
  default: { get: vi.fn() },
}));

describe("AuthProvider", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("login exitoso debe guardar usuario y rol", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (api.get as any).mockResolvedValue({
      data: { email: "user@example.com", role: "ADMIN" },
    });

    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <MemoryRouter>
          <AuthProvider>{children}</AuthProvider>
        </MemoryRouter>
      ),
    });

    let loginSuccess = false;
    await act(async () => {
      loginSuccess = await result.current.login("user@example.com", "pass");
    });

    expect(loginSuccess).toBe(true);
    expect(result.current.user).toBe("user@example.com");
    expect(result.current.role).toBe("ADMIN");
    expect(authStorage.saveAuth).toHaveBeenCalled();
  });

  it("login fallido debe limpiar auth y devolver false", async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (api.get as any).mockRejectedValue(new Error("Unauthorized"));

    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <MemoryRouter>
          <AuthProvider>{children}</AuthProvider>
        </MemoryRouter>
      ),
    });

    let loginSuccess = true;
    await act(async () => {
      loginSuccess = await result.current.login("bad", "creds");
    });

    expect(loginSuccess).toBe(false);
    expect(authStorage.clearAuth).toHaveBeenCalled();
  });

  it("logout limpia auth y resetea estado", () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: ({ children }) => (
        <MemoryRouter>
          <AuthProvider>{children}</AuthProvider>
        </MemoryRouter>
      ),
    });

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.role).toBeNull();
    expect(authStorage.clearAuth).toHaveBeenCalled();
  });
});
