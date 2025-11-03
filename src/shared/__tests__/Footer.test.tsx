import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Footer from "../components/Footer";

vi.mock("../assets/logo-white.svg", () => ({
  default: "mocked-logo.svg",
}));

describe("Footer component", () => {
  it("renderiza la sección Acerca de con el logo y texto", () => {
    render(<Footer />);

    expect(
      screen.getByText("Acerca de Calor en la noche")
    ).toBeInTheDocument();

    const logo = screen.getByRole("img");
    expect(logo).toHaveAttribute("src", "mocked-logo.svg");

    expect(
      screen.getByText(/La Asociación Calor en la noche es una entidad/i)
    ).toBeInTheDocument();
  });

  it("renderiza los enlaces de redes sociales correctamente", () => {
    render(<Footer />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(3);

    expect(links[0]).toHaveAttribute(
      "href",
      "https://www.instagram.com/calorenlanochecadiz/?hl=es"
    );
    expect(links[1]).toHaveAttribute(
      "href",
      "https://www.facebook.com/calorenlanoche/"
    );
    expect(links[2]).toHaveAttribute("href", "https://x.com/calornoche");
  });

  it("muestra el contacto correctamente", () => {
    render(<Footer />);
    expect(screen.getByText("Contacto")).toBeInTheDocument();
    expect(
      screen.getByText("calorenlanoche@lasalleandalucia.net")
    ).toBeInTheDocument();
  });
});
