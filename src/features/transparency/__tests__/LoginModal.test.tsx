import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import LoginModal from "../components/LoginModal";
import { login } from "../../auth/services/authService";

vi.mock("../../auth/services/authService", () => ({
  login: vi.fn(),
}));

describe("LoginModal component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("no renderiza cuando isOpen es false", () => {
    const { container } = render(<LoginModal isOpen={false} onClose={() => {}} />);
    expect(container.firstChild).toBeNull();
  });

  it("renderiza formulario correctamente", () => {
    render(<LoginModal isOpen={true} onClose={() => {}} />);
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  });

  it("llama a login correctamente y cierra modal al éxito", async () => {
    const handleClose = vi.fn();
    const mockLogin = vi.mocked(login);
    mockLogin.mockResolvedValue({
      email: "",
      role: "",
      status: ""
    });

    render(<LoginModal isOpen={true} onClose={handleClose} />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "user@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "1234" },
    });
    fireEvent.submit(screen.getByRole("button", { name: "Login" }));

    await waitFor(() => expect(mockLogin).toHaveBeenCalled());
    expect(handleClose).toHaveBeenCalled();
  });

  it("muestra error si el login falla", async () => {
    vi.mocked(login).mockRejectedValue(new Error("Bad creds"));
    render(<LoginModal isOpen={true} onClose={() => {}} />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "user@test.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrong" },
    });
    fireEvent.submit(screen.getByRole("button", { name: "Login" }));

    await waitFor(() =>
      expect(
        screen.getByText(/Credenciales incorrectas o error/i)
      ).toBeInTheDocument()
    );
  });
});
