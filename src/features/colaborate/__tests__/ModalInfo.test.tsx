import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ModalInfo from "../components/ModalInfo";

describe("ModalInfo component", () => {
  it("no renderiza nada cuando isOpen es false", () => {
    const { container } = render(
      <ModalInfo isOpen={false} onClose={() => {}} title="Test" text="Contenido" />
    );
    expect(container.firstChild).toBeNull();
  });

  it("muestra el contenido cuando isOpen es true", () => {
    render(
      <ModalInfo
        isOpen={true}
        onClose={() => {}}
        title="Información"
        text="Contenido del modal"
      />
    );

    expect(screen.getByText("Información")).toBeInTheDocument();
    expect(screen.getByText("Contenido del modal")).toBeInTheDocument();
  });

  it("no cierra el modal al hacer clic dentro del contenido", () => {
    const handleClose = vi.fn();
    render(
      <ModalInfo
        isOpen={true}
        onClose={handleClose}
        title="Cerrar test"
        text="Cuerpo"
      />
    );

    const innerContent = screen.getByText("Cuerpo");
    fireEvent.click(innerContent);
    expect(handleClose).not.toHaveBeenCalled();
  });

  it("llama a onClose al hacer clic en el botón de cierre", () => {
    const handleClose = vi.fn();
    render(
      <ModalInfo
        isOpen={true}
        onClose={handleClose}
        title="Cerrar test"
        text="Cuerpo"
      />
    );

    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
