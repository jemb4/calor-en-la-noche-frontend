import React from "react";
import Logo from "../assets/logo-white.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faXTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';


const Footer: React.FC = () => {
    return (
    <footer className="w-full flex flex-col md:flex-row justify-between items-start gap-8 p-8 md:p-12 bg-basics-700 text-basics-100">
      {/* Columna 1 */}
      <div className="flex-1 my-auto">
        <h3 className="mb-3 title-XL-bold text-center">Acerca de Calor en la noche</h3>
        <img src={Logo} className="w-25 mb-5 mx-auto"/>
        <p className="text-S-regular leading-relaxed">
          La Asociación Calor en la noche es una entidad sin ánimo de lucro,
          de iniciativa social e independiente, de utilidad pública e
          inscrita en el registro nacional de asociaciones con el número ######.
        </p>
      </div>

      {/* Columna 2 */}
      <div className="flex-1 my-auto justify-center items-center">
        <h3 className="mb-3 title-XL-bold text-center">Siguenos en redes</h3>
        <div className="flex justify-center items-center gap-6">
          <FontAwesomeIcon icon={faInstagram} className="text-3xl hover:text-primary-500 transition-colors" />
          <FontAwesomeIcon icon={faFacebook} className="text-3xl hover:text-primary-500 transition-colors" />
          <FontAwesomeIcon icon={faXTwitter} className="text-3xl hover:text-primary-500 transition-colors" />
        </div>
      </div>

      {/* Columna 3 */}
      <div className="flex-1 my-auto mx-auto">
        <h3 className="mb-3 title-XL-bold  text-center">Contacto</h3>
        <p className="text-S-regular leading-relaxed  text-center">
          Correo@correo.com
        </p>
      </div>
    </footer>
  );
}

export default Footer;