import React from "react";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  pdfName?: string;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  pdfName,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="title-XL-bold text-primary-700 mb-4 text-center">
          Confirmar eliminación
        </h2>
        <p className="text-basics-700 mb-6 text-center">
          ¿Estás seguro de que quieres eliminar el archivo{" "}
          <span className="font-semibold text-primary-700">{pdfName}</span>?
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-basics-300 text-basics-700 hover:bg-gray-300 transition cursor-pointer hover:scale-105"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-primary-500 text-basics-100 hover:bg-warning-700 transition cursor-pointer hover:scale-110"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
