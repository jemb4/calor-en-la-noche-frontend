import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import ColaborateInfo from "../components/ColaborateInfo";

describe("ColaborateInfo component", () => {
  it("renderiza correctamente el texto para 'Donación'", () => {
    render(<ColaborateInfo title="Donación" />);

    expect(
      screen.getByText(/Con tu ayuda económica, podemos seguir ofreciendo alimentos/i)
    ).toBeInTheDocument();

    expect(screen.getByText(/ES55 2103 4018 18 0030011373/i)).toBeInTheDocument();
  });

  it("renderiza correctamente el texto para 'Socio'", () => {
    render(<ColaborateInfo title="Socio" />);

    expect(
      screen.getByText(/aportaciones son lo que cada uno pueda/i)
    ).toBeInTheDocument();

    const strongElement = screen.getByText(/Calor en la Noche/i);
    expect(strongElement.tagName).toBe("STRONG");
  });

  it("renderiza correctamente el texto para 'Voluntario'", () => {
    render(<ColaborateInfo title="Voluntario" />);

    expect(screen.getByText(/Voluntario observador/i)).toBeInTheDocument();
    expect(screen.getByText(/Voluntario de intendencia/i)).toBeInTheDocument();
    expect(screen.getByText(/Voluntario de calle/i)).toBeInTheDocument();
  });

  it("formatea correctamente negritas y saltos de línea", () => {
    render(<ColaborateInfo title="Socio" />);

    const container = screen.getByText(/aportaciones son lo que cada uno pueda/i)
      .parentElement as HTMLElement;

    expect(container.innerHTML).toContain("<strong>");
    expect(container.innerHTML).toContain("<br");
  });
});
