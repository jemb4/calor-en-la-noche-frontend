import axios from "axios";

import API_URL from "../../../app/api/apiCalorNoche";

const api = axios.create({
  baseURL: `${API_URL}/pdf`,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface PdfItem {
  pdfId: string;
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
