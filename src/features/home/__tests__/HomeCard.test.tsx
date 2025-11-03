import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import InfoCard from "../components/HomeCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

describe("InfoCard component", () => {
  it("renderiza correctamente el icono, título y texto", () => {
    render(
      <InfoCard
        icon={<FontAwesomeIcon icon={faHeart} data-testid="icon" />}
        title="Solidaridad"
        text="Apoyamos a quienes más lo necesitan."
      />
    );

    expect(screen.getByText("Solidaridad")).toBeInTheDocument();
    expect(screen.getByText("Apoyamos a quienes más lo necesitan.")).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
  });

  it("aplica las clases de estilo principales", () => {
    const { container } = render(
      <InfoCard icon={<div />} title="Test" text="Texto" />
    );

    const card = container.firstChild as HTMLElement;
    expect(card.className).toContain("rounded-xl");
    expect(card.className).toContain("p-6");
    expect(card.className).toContain("hover:scale");
  });
});
