import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DeleteModal from "../components/DeleteModal";

describe("DeleteModal component", () => {
  it("no renderiza cuando isOpen es false", () => {
    const { container } = render(
      <DeleteModal isOpen={false} onClose={() => {}} onConfirm={() => {}} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("muestra el nombre del PDF y los botones", () => {
    render(
      <DeleteModal
        isOpen={true}
        onClose={() => {}}
        onConfirm={() => {}}
        pdfName="documento.pdf"
      />
    );

    expect(screen.getByText("Confirmar eliminación")).toBeInTheDocument();
    expect(screen.getByText(/documento.pdf/i)).toBeInTheDocument();
    expect(screen.getByText("Cancelar")).toBeInTheDocument();
    expect(screen.getByText("Eliminar")).toBeInTheDocument();
  });

  it("llama a onClose al hacer clic fuera o en cancelar", () => {
    const handleClose = vi.fn();
    render(
      <DeleteModal
        isOpen={true}
        onClose={handleClose}
        onConfirm={() => {}}
        pdfName="doc.pdf"
      />
    );

    fireEvent.click(screen.getByText("Cancelar"));
    expect(handleClose).toHaveBeenCalled();
  });

  it("llama a onConfirm al hacer clic en Eliminar", () => {
    const handleConfirm = vi.fn();
    render(
      <DeleteModal
        isOpen={true}
        onClose={() => {}}
        onConfirm={handleConfirm}
        pdfName="doc.pdf"
      />
    );

    fireEvent.click(screen.getByText("Eliminar"));
    expect(handleConfirm).toHaveBeenCalled();
  });
});
