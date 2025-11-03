import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Colaborate from "../pages/Colaborate";

vi.mock("../components/ColaborateInfo", () => ({
  default: ({ title }: { title: string }) => (
    <div data-testid="colaborate-info">Info de {title}</div>
  ),
}));

describe("Colaborate component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renderiza correctamente el encabezado y las tres tarjetas", () => {
    render(<Colaborate />);

    expect(
      screen.getByText("Colabora con nosotros")
    ).toBeInTheDocument();

    expect(screen.getByText("Donación")).toBeInTheDocument();
    expect(screen.getByText("Socio")).toBeInTheDocument();
    expect(screen.getByText("Voluntario")).toBeInTheDocument();

    expect(screen.queryByTestId("colaborate-info")).toBeNull();
  });

  it("al hacer clic en una tarjeta se muestra la información correspondiente", () => {
    render(<Colaborate />);

    const donationCard = screen.getByText("Donación");
    fireEvent.click(donationCard);

    const donationTitles = screen.getAllByText("Donación");
    expect(donationTitles.length).toBeGreaterThan(1);
    expect(donationTitles[1]).toBeInTheDocument();

    expect(screen.getByTestId("colaborate-info")).toHaveTextContent(
      "Info de Donación"
    );
  });


  it("al hacer clic en una tarjeta distinta cambia el contenido", () => {
    render(<Colaborate />);

    const donationCard = screen.getByText("Donación");
    const socioCard = screen.getByText("Socio");

    fireEvent.click(donationCard);
    expect(screen.getByTestId("colaborate-info")).toHaveTextContent(
      "Info de Donación"
    );

    fireEvent.click(socioCard);
    expect(screen.getByTestId("colaborate-info")).toHaveTextContent(
      "Info de Socio"
    );
  });

  it("al hacer clic dos veces en la misma tarjeta se cierra la sección", () => {
    render(<Colaborate />);

    const volunteerCard = screen.getByText("Voluntario");

    fireEvent.click(volunteerCard);
    expect(screen.getByTestId("colaborate-info")).toBeInTheDocument();

    fireEvent.click(volunteerCard);
    expect(screen.queryByTestId("colaborate-info")).toBeNull();
  });

  it("añade clase de borde primaria a la tarjeta seleccionada", () => {
    render(<Colaborate />);

    const donationCard = screen.getByText("Donación").closest("div")!;
    fireEvent.click(donationCard);

    expect(donationCard.className).toContain("border-primary-700");
  });
});
