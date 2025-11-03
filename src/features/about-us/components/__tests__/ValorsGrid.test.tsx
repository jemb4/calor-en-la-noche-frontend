import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ValorsGrid from "../ValorsGrid";

describe("ValorsGrid component", () => {
  it("renderiza sin errores", () => {
    render(<ValorsGrid />);

    const listElement = screen.getByRole("list");
    expect(listElement).toBeInTheDocument();
  });

  it("muestra todos los valores definidos", () => {
    render(<ValorsGrid />);

    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(9);
  });

  it("muestra los títulos esperados", () => {
    render(<ValorsGrid />);

    expect(screen.getByText("Identidad Lasaliana")).toBeInTheDocument();
    expect(screen.getByText("Fraternidad")).toBeInTheDocument();
    expect(screen.getByText("Transparencia")).toBeInTheDocument();
  });

  it("muestra las descripciones correspondientes", () => {
    render(<ValorsGrid />);

    expect(
      screen.getByText(/Inspirados en los valores educativos/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Fomentamos la unión y el respeto mutuo/i)
    ).toBeInTheDocument();
  });
});
