import axios from "axios";
import API_URL from "../../../app/api/apiCalorNoche";
import { getAuthHeader } from "../../auth/services/authService";

const api = axios.create({
  baseURL: `${API_URL}/pdf`,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface PdfItem {
  pdfId: number;
  name: string;
  age: string;
  urlPdf: string;
}

export const getAllPdfs = async (): Promise<PdfItem[]> => {
  try {
    const response = await api.get("/all");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los PDFs:", error);
    throw error;
  }
};

export const deletePdf = async (id: number): Promise<void> => {
  try {
    const headers = getAuthHeader();

    if (!headers.Authorization) {
      throw new Error("No hay sesión activa. Inicia sesión para eliminar archivos.");
    }

    await api.delete(`/${id}`, { headers });

    console.log(`PDF con id ${id} eliminado correctamente`);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Error al eliminar el PDF:", error.response?.data);
    } else if (error instanceof Error) {
      console.error("Error al eliminar el PDF:", error.message);
    } else {
      console.error("Error desconocido al eliminar el PDF:", error);
    }

    throw error;
  }
};

export const uploadPdf = async (
  file: File,
  data: { name: string; age: number }
): Promise<void> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("data", JSON.stringify(data));

  try {
    await axios.post(`${API_URL}/pdf/upload`, formData, {
      headers: {
        ...getAuthHeader(),
      },
      maxBodyLength: Infinity,
    });
  } catch (error) {
    console.error("Error al subir PDF:", error);
    throw error;
  }
};