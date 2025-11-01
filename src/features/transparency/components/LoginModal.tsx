import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onClick={onClose}
    >
      <div
        className="bg-secondary-100 rounded-2xl shadow-lg p-8 w-full max-w-sm mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-basics-500 hover:text-basics-900 hover:bg-basics-300 rounded transition-colors cursor-pointer"
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>

        <h2 className="text-center text-lg font-bold mb-1">Login</h2>
        <h3 className="text-center title-L-bold mb-8 text-basics-900">
          Bienvenido
        </h3>

        <form className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-lg p-3 bg-basics-300 placeholder-primary-700 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full rounded-lg p-3 bg-basics-300 placeholder-primary-700 focus:outline-none"
          />

          {/* <a
            href="#"
            className="text-primary-700 text-sm text-center mt-2 hover:underline"
          >
            Forgot password?
          </a> */}

          <button
            type="submit"
            className="mt-4 w-full bg-primary-700 text-white rounded-lg py-3 font-semibold hover:bg-primary-500 transition-colors cursor-pointer"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
