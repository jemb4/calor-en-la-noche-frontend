import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import ValorsGrid from "../components/ValorsGrid";

const AboutUs: React.FC = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <main className="min-h-screen bg-basics-50 text-M-regular text-basics-700 px-6 md:px-10 py-10 flex flex-col items-center">

      <header className="max-w-3xl w-full mb-8">
        <h1 className="headline-M-bold text-primary-700 mb-4">Quiénes somos</h1>
        <p className="leading-relaxed">
          La Asociación Calor en la Noche es una entidad sin ánimo de lucro
          perteneciente a la Red de Obras de La Salle que nace en el año 2002 en
          torno a un grupo de voluntarios vinculados al Colegio La Salle Viña de
          Cádiz con la propuesta de acompañar e intentar acercarse más a los
          desprotegidos de nuestra sociedad, a las personas sin hogar, con el fin
          de que tengan una vida más digna.
        </p>
      </header>

      {/* Dropdown Sections */}
      <section className="max-w-3xl w-full divide-y divide-gray-200 border-t border-b border-gray-200">

 
        <div>
          <button
            onClick={() => toggleSection("mision")}
            className="w-full flex justify-between items-center py-4 text-left text-L-bold focus:outline-none cursor-pointer"
          >
            Misión
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`text-gray-600 transition-transform duration-300 ${
                openSection === "mision" ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              openSection === "mision"
                ? "max-h-[500px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <p className="pb-4 text-basics-700 leading-relaxed">
              La Asociación Calor en la Noche fundamenta su intervención socioeducativa
              en el carisma lasaliano, trabajando para contribuir al desarrollo integral
              humano y social de las personas sin hogar en situación de vulnerabilidad,
              respetando y promoviendo sus derechos y dignidad.
            </p>
          </div>
        </div>


        <div>
          <button
            onClick={() => toggleSection("vision")}
            className="w-full flex justify-between items-center py-4 text-left text-L-bold focus:outline-none cursor-pointer"
          >
            Visión
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`text-gray-600 transition-transform duration-300 ${
                openSection === "vision" ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              openSection === "vision"
                ? "max-h-[500px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <p className="pb-4 text-basics-700 leading-relaxed">
              Aspiramos a una sociedad más justa y solidaria, donde ninguna persona
              se vea forzada a vivir en la calle y donde todas puedan sentirse
              escuchadas, valoradas y acompañadas. Buscamos crear redes humanas que
              impulsen el cambio desde la empatía y la acción social.
            </p>
          </div>
        </div>


        <div>
          <button
            onClick={() => toggleSection("valores")}
            className="w-full flex justify-between items-center py-4 text-left text-L-bold focus:outline-none cursor-pointer"
          >
            Valores
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`text-gray-600 transition-transform duration-300 ${
                openSection === "valores" ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-700 ease-in-out ${
              openSection === "valores"
                ? "max-h-[2000px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <ValorsGrid />
          </div>
        </div>

 
        <div>
          <button
            onClick={() => toggleSection("organizacion")}
            className="w-full flex justify-between items-center py-4 text-left text-L-bold focus:outline-none cursor-pointer"
          >
            Organización
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`text-gray-600 transition-transform duration-300 ${
                openSection === "organizacion" ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${
              openSection === "organizacion"
                ? "max-h-[1000px] opacity-100"
                : "max-h-0 opacity-0"
            }`}
          >
            <div className="pb-4 text-basics-700 leading-relaxed space-y-3">
              <p>
                Calor en la Noche desarrolla su labor gracias a la participación
                activa de voluntarios y colaboraciones solidarias. Cada noche,
                equipos de personas recorren las calles de Cádiz ofreciendo alimentos,
                bebidas, mantas y compañía a quienes viven sin hogar.
              </p>
              <p>
                También realizamos seguimiento a personas hospitalizadas, acompañamos
                procesos de inserción social y organizamos campañas de sensibilización
                para concienciar sobre la realidad de la pobreza y la exclusión.
              </p>
              <p>
                Las actividades se financian principalmente mediante donaciones
                particulares, eventos solidarios y colaboraciones institucionales,
                todo bajo un modelo de transparencia y rendición de cuentas.
              </p>
            </div>
          </div>
        </div>
      </section>


      <div className="flex flex-col gap-3 mt-10 w-full max-w-3xs mx-auto">
        <Link
          to="/colabora"
          className="bg-primary-700 hover:bg-success-500 text-basics-100 transition-transform duration-200 ease-out hover:scale-105 text-center py-3 rounded-lg font-semibold"
        >
          Donar
        </Link>
        <Link
          to="/"
          className="bg-primary-50 hover:bg-primary-100 text-basics-900 transition-transform duration-200 ease-out hover:scale-105 text-center py-3 rounded-lg font-semibold"
        >
          Volver
        </Link>
      </div>
    </main>
  );
};

export default AboutUs;
