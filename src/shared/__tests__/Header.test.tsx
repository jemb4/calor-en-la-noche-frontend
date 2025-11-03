import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, vi } from "vitest";
import Header from "../components/Header";

vi.mock("../assets/logo.svg", () => ({
  default: "mocked-logo.svg",
}));

describe("Header component", () => {
  it("renderiza el logo y los enlaces de escritorio", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    const logo = screen.getByRole("img", { name: /logo calor en la noche/i });
    expect(logo).toHaveAttribute("src", "mocked-logo.svg");

    expect(screen.getByText("Nosotros")).toHaveAttribute("href", "/nosotros");
    expect(screen.getByText("Transparencias")).toHaveAttribute(
      "href",
      "/transparencias"
    );
    expect(screen.getByText("Colabora")).toHaveAttribute("href", "/colaborar");

    expect(screen.getByText("Noticias").closest("a")).not.toHaveAttribute("href");
  });

  it("abre y cierra el menú móvil correctamente", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    expect(
      screen.queryByText("Transparencias", { selector: "a" })
    ).toBeInTheDocument();
    expect(screen.queryByText("Nosotros")).toBeInTheDocument();

    const toggleBtn = screen.getByRole("button");
    fireEvent.click(toggleBtn);

    expect(screen.getAllByText("Colabora")[0]).toBeInTheDocument();

    fireEvent.click(toggleBtn);


    expect(screen.getAllByText("Colabora").length).toBe(1);
  });
});
