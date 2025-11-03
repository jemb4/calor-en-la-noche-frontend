import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ValorsGrid from "../components/ValorsGrid";

describe("ValorsGrid component", () => {
  it("renderiza correctamente la lista de valores", () => {
    render(<ValorsGrid />);

    // debería haber 9 elementos <li> (uno por valor)
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(9);
  });

  it("muestra todos los títulos correctamente", () => {
    render(<ValorsGrid />);

    const expectedTitles = [
      "Identidad Lasaliana",
      "Fraternidad",
      "Solidaridad",
      "Convivencia",
      "Responsabilidad",
      "Capacidad crítica",
      "Diálogo",
      "Cooperación",
      "Transparencia",
    ];

    expectedTitles.forEach((title) => {
      expect(screen.getByText(title)).toBeInTheDocument();
    });
  });

  it("muestra las descripciones correspondientes", () => {
    render(<ValorsGrid />);

    expect(
      screen.getByText(
        "Inspirados en los valores educativos y humanos de La Salle, promovemos la atención a los más vulnerables."
      )
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "Nos comprometemos activamente con quienes más lo necesitan, ofreciendo tiempo, recursos y apoyo."
      )
    ).toBeInTheDocument();
  });
});
