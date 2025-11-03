import axios from "axios";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { getAuthHeader } from "../../auth/services/authService";
import { getAllPdfs, deletePdf, uploadPdf } from "../services/pdfService";

// ✅ Mock de axios
vi.mock("axios");
vi.mock("../../auth/services/authService", () => ({
  getAuthHeader: vi.fn(),
}));

const mockedAxios = {
  get: vi.fn(),
  delete: vi.fn(),
  post: vi.fn(),
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
vi.mocked(axios.create).mockReturnValue(mockedAxios as any);

const mockedGetAuthHeader = vi.mocked(getAuthHeader, true);

describe("pdfService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // it("getAllPdfs obtiene la lista correctamente", async () => {
  //   const fakeData = [{ pdfId: 1, name: "Doc", age: "25", urlPdf: "link" }];
  //   mockedAxios.get.mockResolvedValue({ data: fakeData });

  //   const result = await getAllPdfs();
  //   expect(result).toEqual(fakeData);
  //   expect(mockedAxios.get).toHaveBeenCalledWith("/all");
  // });

  it("deletePdf lanza error si no hay header de autorización", async () => {
    mockedGetAuthHeader.mockReturnValue({});
    await expect(deletePdf(1)).rejects.toThrow(/No hay sesión activa/i);
  });

  // it("deletePdf realiza una llamada DELETE exitosa", async () => {
  //   mockedGetAuthHeader.mockReturnValue({ Authorization: "Basic XYZ" });
  //   mockedAxios.delete.mockResolvedValue({});

  //   await deletePdf(5);
  //   expect(mockedAxios.delete).toHaveBeenCalledWith("/5", {
  //     headers: { Authorization: "Basic XYZ" },
  //   });
  // });

  it("uploadPdf envía archivo y datos correctamente", async () => {
    const mockFile = new File(["test"], "archivo.pdf", { type: "application/pdf" });
    mockedGetAuthHeader.mockReturnValue({ Authorization: "Basic XYZ" });
    mockedAxios.post.mockResolvedValue({});

    await uploadPdf(mockFile, { name: "Test", age: 30 });

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringMatching(/\/pdf\/upload$/),
      expect.any(FormData),
      expect.objectContaining({
        headers: expect.objectContaining({ Authorization: "Basic XYZ" }),
      })
    );
  });
});
