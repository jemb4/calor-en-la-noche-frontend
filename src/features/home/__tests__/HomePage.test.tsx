import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";

vi.mock("../assets/nightbank.png", () => ({
  default: "mocked-bank.png",
}));

vi.mock("../components/HomeCard", () => ({
  default: ({ title }: { title: string }) => (
    <div data-testid="home-card">{title}</div>
  ),
}));

describe("HomePage component", () => {
  it("renderiza la sección hero correctamente", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Esta noche, alguien dormirá aquí")
    ).toBeInTheDocument();

    expect(
      screen.getByText(/La realidad de las personas sin hogar/i)
    ).toBeInTheDocument();

    const donateLink = screen.getByRole("link", { name: /Donar ahora/i });
    expect(donateLink).toHaveAttribute("href", "/colaborar");

    const image = screen.getByAltText("Persona sin hogar");
    expect(image).toHaveAttribute("src", "mocked-bank.png");
  });

  it("renderiza la sección de datos con tres estadísticas", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText("La dura realidad:")).toBeInTheDocument();

    expect(
      screen.getByText("Personas sin hogar en España")
    ).toBeInTheDocument();
    expect(screen.getByText("Noches de servicio")).toBeInTheDocument();
    expect(screen.getByText("Comidas servidas")).toBeInTheDocument();

    expect(screen.getByText("+28.000")).toBeInTheDocument();
    expect(screen.getByText("+300")).toBeInTheDocument();
    expect(screen.getByText("+10.000")).toBeInTheDocument();
  });

  it("renderiza la sección de qué hacemos con el enlace correcto", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(
      screen.getByText("Qué hacemos desde Calor en la Noche")
    ).toBeInTheDocument();

    const missionLink = screen.getByRole("link", {
      name: /Conoce nuestra misión/i,
    });
    expect(missionLink).toHaveAttribute("href", "/nosotros");
  });

  it("renderiza las tres tarjetas HomeCard mockeadas", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const cards = screen.getAllByTestId("home-card");
    expect(cards).toHaveLength(3);
    expect(cards[0]).toHaveTextContent("Comida y Abrigo");
    expect(cards[1]).toHaveTextContent("Apoyo Emocional");
    expect(cards[2]).toHaveTextContent("Recursos");
  });
});
