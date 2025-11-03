import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import AboutUs from "../pages/AboutUs";

vi.mock("../components/ValorsGrid", () => ({
  default: () => <div data-testid="valors-grid">Mocked ValorsGrid</div>,
}));

describe("AboutUs component", () => {
  const renderAboutUs = () =>
    render(
      <MemoryRouter>
        <AboutUs />
      </MemoryRouter>
    );

  it("renderiza correctamente el encabezado y texto principal", () => {
    renderAboutUs();

    expect(screen.getByText("Quiénes somos")).toBeInTheDocument();
    expect(
      screen.getByText(/La Asociación Calor en la Noche es una entidad sin ánimo de lucro/i)
    ).toBeInTheDocument();
  });

  it("renderiza los botones de las secciones", () => {
    renderAboutUs();

    expect(screen.getByText("Misión")).toBeInTheDocument();
    expect(screen.getByText("Visión")).toBeInTheDocument();
    expect(screen.getByText("Valores")).toBeInTheDocument();
    expect(screen.getByText("Organización")).toBeInTheDocument();
  });

  it("abre y cierra la sección 'Misión' al hacer click", () => {
    renderAboutUs();

    const missionButton = screen.getByText("Misión");
    fireEvent.click(missionButton);

    const missionText = screen.getByText(
      /La Asociación Calor en la Noche fundamenta su intervención/i
    );
    expect(missionText).toBeInTheDocument();

    fireEvent.click(missionButton);

    const missionContainer = missionText.closest("div");
    expect(missionContainer?.className).toContain("max-h-0");
  });

  it("solo una sección debe estar abierta a la vez", () => {
    renderAboutUs();

    const missionButton = screen.getByText("Misión");
    const visionButton = screen.getByText("Visión");

    fireEvent.click(missionButton);
    const missionText = screen.getByText(
      /La Asociación Calor en la Noche fundamenta su intervención/i
    );
    expect(missionText.closest("div")?.className).toContain("max-h-[500px]");

    fireEvent.click(visionButton);
    const visionText = screen.getByText(/Aspiramos a una sociedad más justa/i);
    expect(visionText.closest("div")?.className).toContain("max-h-[500px]");

    expect(missionText.closest("div")?.className).toContain("max-h-0");
  });

  it("muestra el componente ValorsGrid al abrir la sección 'Valores'", () => {
    renderAboutUs();

    const valoresButton = screen.getByText("Valores");
    fireEvent.click(valoresButton);

    expect(screen.getByTestId("valors-grid")).toBeInTheDocument();
  });

  it("muestra los enlaces de Donar y Volver con las rutas correctas", () => {
    renderAboutUs();

    const donateLink = screen.getByRole("link", { name: /Donar/i });
    const backLink = screen.getByRole("link", { name: /Volver/i });

    expect(donateLink).toHaveAttribute("href", "/colaborar");
    expect(backLink).toHaveAttribute("href", "/");
  });
});
