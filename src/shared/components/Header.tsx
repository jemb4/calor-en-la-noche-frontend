import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark } from "@fortawesome/free-solid-svg-icons";
import Logo from "../assets/logo.svg"
import { Link } from "react-router";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full bg-basics-100 text-basics-900">
      <div className="flex justify-between px-6 py-4">
        <div className="flex items-center space-x-3">
          <Link to="/">
            <img 
              src={Logo} 
              className="h-25 transform transition-transform duration-300 ease-out"
              alt="logo calor en la noche"
            />
          </Link>
        </div>


{/* TODO: Add Lins */}
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/nosotros"
            className="title-L-bold hover:text-primary-700 transition-transform duration-100 ease-out hover:scale-105"
          >
            Nosotros
          </Link>
          {/* <a href="#" className="title-L-bold hover:text-primary-700 transition-transform duration-100 ease-out hover:scale-105">
            Qué Hacemos
          </a> */}
          <Link to="transparencias" className="title-L-bold hover:text-primary-700 transition-transform duration-100 ease-out hover:scale-105">
            Transparencias
          </Link>
          <a href="#" className="title-L-bold hover:text-primary-700 transition-transform duration-100 ease-out hover:scale-105">
            Noticias
          </a>
          <a
            href="#"
            className="title-L-bold bg-primary-700 text-basics-100 px-4 py-2 rounded-lg hover:bg-success-500 transition-transform duration-100 ease-out hover:scale-105"
          >
            Colabora
          </a>
        </nav>


        <button
          className="md:hidden text-basics-900"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FontAwesomeIcon icon={isOpen ? faXmark : faBars} className="text-2xl hover:cursor-pointer transition-transform duration-100 ease-out hover:scale-105" />
        </button>
      </div>

      {/* Menú móvil */}
      {isOpen && (
        <div className="md:hidden flex flex-col items-center gap-4 pb-6 bg-basics-100">
          <Link 
            to="/nosotros"
            className="title-L-bold hover:text-primary-700 transition-transform duration-100 ease-out hover:scale-105"
          >
            Nosotros
          </Link>
          {/* <a href="#" className="title-L-bold hover:text-primary-700 transition-transform duration-100 ease-out hover:scale-105">
            Qué Hacemos
          </a> */}
          <Link to="/transparencias" className="title-L-bold hover:text-primary-700 transition-transform duration-100 ease-out hover:scale-105">
            Transparencias
          </Link>
          <a href="#" className="title-L-bold hover:text-primary-700 transition-transform duration-100 ease-out hover:scale-105">
            Noticias
          </a>
          <a
            href="#"
            className="title-L-bold bg-primary-700 text-basics-100 px-4 py-2 rounded-lg hover:bg-success-500 transition-transform duration-100 ease-out hover:scale-105"
          >
            Colabora
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;