import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import UploadPdfModal from "../components/UploadPdfModal";
import { uploadPdf } from "../services/pdfService";

vi.mock("../services/pdfService", () => ({
  uploadPdf: vi.fn(),
}));

describe("UploadPdfModal component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("no renderiza cuando isOpen es false", () => {
    const { container } = render(
      <UploadPdfModal
        isOpen={false}
        onClose={() => {}}
        onUploadSuccess={() => {}}
      />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renderiza inputs y botones correctamente", () => {
    render(
      <UploadPdfModal
        isOpen={true}
        onClose={() => {}}
        onUploadSuccess={() => {}}
      />
    );

    expect(screen.getByText("Subir nuevo PDF")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Título")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("2025")).toBeInTheDocument();
    expect(screen.getByText("Seleccionar archivo")).toBeInTheDocument();
  });

  it("muestra alertas si los campos están vacíos", async () => {
    const alertMock = vi.spyOn(window, "alert").mockImplementation(() => {});
    render(
      <UploadPdfModal
        isOpen={true}
        onClose={() => {}}
        onUploadSuccess={() => {}}
      />
    );

    fireEvent.submit(screen.getByRole("button", { name: "Subir PDF" }));
    expect(alertMock).toHaveBeenCalledWith(
      "Por favor, completa todos los campos."
    );
  });

  it("sube un archivo PDF exitosamente", async () => {
    const mockClose = vi.fn();
    const mockSuccess = vi.fn();
    const mockFile = new File(["content"], "file.pdf", { type: "application/pdf" });

    render(
      <UploadPdfModal
        isOpen={true}
        onClose={mockClose}
        onUploadSuccess={mockSuccess}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Título"), {
      target: { value: "Test PDF" },
    });
    fireEvent.change(screen.getByPlaceholderText("2025"), {
      target: { value: "2025" },
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const fileInput = screen.getByLabelText("Seleccionar archivo");
    const hiddenInput = document.querySelector("input[type='file']")!;
    Object.defineProperty(hiddenInput, "files", {
      value: [mockFile],
    });

    fireEvent.change(hiddenInput);

    vi.mocked(uploadPdf).mockResolvedValue(undefined);

    fireEvent.submit(screen.getByRole("button", { name: "Subir PDF" }));

    await waitFor(() => expect(uploadPdf).toHaveBeenCalled());
    expect(mockSuccess).toHaveBeenCalled();
    expect(mockClose).toHaveBeenCalled();
  });
});
