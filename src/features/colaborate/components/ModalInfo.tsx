import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface ModalInfoProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  text: string;
}

const ModalInfo: React.FC<ModalInfoProps> = ({ isOpen, onClose, title, text }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-basics-50 rounded-2xl shadow-lg p-8 w-full max-w-md mx-4 relative animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-basics-500 hover:text-primary-700 transition-colors"
        >
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </button>


        <h2 className="headline-S-bold text-primary-700 mb-4">{title}</h2>
        <p className="text-basics-700 leading-relaxed">{text}</p>
      </div>
    </div>
  );
};

export default ModalInfo;
