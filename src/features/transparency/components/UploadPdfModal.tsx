import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { uploadPdf } from "../services/pdfService";

interface UploadPdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: () => void;
}

const UploadPdfModal: React.FC<UploadPdfModalProps> = ({
  isOpen,
  onClose,
  onUploadSuccess,
}) => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !year || !file) {
      alert("Por favor, completa todos los campos.");
      return;
    }
    if (file.type !== "application/pdf") {
      alert("Solo se permiten archivos PDF.");
      return;
    }

    setIsSubmitting(true);
    try {
      await uploadPdf(file, { name: title, age: Number(year) });
      onUploadSuccess();
      onClose();
    } catch (error) {
      console.error("Error al subir el PDF:", error);
      alert("Error al subir el archivo. Verifica la conexión o los permisos.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md mx-4 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-basics-500 hover:text-primary-700 transition-colors"
        >
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </button>

        <h2 className="headline-S-bold text-primary-700 mb-6 text-center">
          Subir nuevo PDF
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-basics-700">
              Título:
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-basics-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-basics-700">
              Año:
            </label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="w-full border border-basics-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              min="2000"
              max="2100"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1 text-basics-700">
              Archivo (solo PDF):
            </label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full border border-basics-300 rounded-lg p-2 bg-basics-100"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-4 w-full bg-primary-700 text-white rounded-lg py-3 font-semibold transition-colors ${
              isSubmitting
                ? "opacity-60 cursor-not-allowed"
                : "hover:bg-primary-500 cursor-pointer"
            }`}
          >
            {isSubmitting ? "Subiendo..." : "Subir PDF"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadPdfModal;
