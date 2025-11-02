import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { login } from "../../auth/services/authService"; 

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await login(email, password);
      onClose();
      window.location.reload();
    } catch (err) {
      setError("Credenciales incorrectas o error de conexión.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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

        <h2 className="text-center text-XL-bold font-bold mb-1">Login</h2>
        <h3 className="text-center text-L-bold mb-8 text-basics-900">
          Bienvenido
        </h3>

        <form className="flex flex-col gap-4 text-M-bold" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg p-3 bg-basics-300 placeholder-primary-700 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg p-3 bg-basics-300 placeholder-primary-700 focus:outline-none"
          />

          {/* <a
            href="#"
            className="text-primary-700 text-sm text-center mt-2 hover:underline"
          >
            Forgot password?
          </a> */}

          {error && <p className="text-center text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="mt-4 w-full bg-primary-700 text-white rounded-lg py-3 text-M-bold hover:bg-primary-500 transition-colors cursor-pointer"
          >
            {loading ? "Accediendo..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
