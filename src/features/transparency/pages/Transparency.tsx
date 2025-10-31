import React, { useEffect, useState } from "react";
import { getAllPdfs, type PdfItem } from "../services/pdfService";
import PdfImg from "../assets/pdf-file.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Transparencias: React.FC = () => {
  const [pdfs, setPdfs] = useState<PdfItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<string>("Todos");

  useEffect(() => {
    const fetchPdfs = async () => {
      try {
        const data = await getAllPdfs();
        const sorted = [...data].sort((a, b) => Number(b.age) - Number(a.age));
        setPdfs(sorted);
      } catch (error) {
        console.error("Error al cargar PDFs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPdfs();
  }, []);

  const years = Array.from(new Set(pdfs.map((pdf) => pdf.age))).sort(
    (a, b) => Number(b) - Number(a)
  );

  const filteredPdfs =
    selectedYear === "Todos"
      ? pdfs
      : pdfs.filter((pdf) => pdf.age === selectedYear);

  return (
    <div className="mb-60 bg-primary-50 py-10 px-6">
      <h1 className="headline-M-bold text-primary-700 mb-2">Transparencias</h1>
      <h2 className="title-XL-bold text-primary-500 mb-8">
        Encuentra la información que buscas en nuestros PDFs descargables
      </h2>

      {/* Filtro */}
      <div className="mb-8 flex flex-wrap items-center gap-3">
        <button
          onClick={() => setSelectedYear("Todos")}
          className={`px-4 py-2 rounded-full border transition hover:cursor-pointer ${
            selectedYear === "Todos"
              ? "bg-primary-700 text-white"
              : "bg-white border-primary-300 hover:bg-primary-100"
          }`}
        >
          Todos
        </button>
        {years.map((year) => (
          <button
            key={year}
            onClick={() => setSelectedYear(year)}
            className={`px-4 py-2 rounded-full border transition hover:cursor-pointer ${
              selectedYear === year
                ? "bg-primary-700 text-white"
                : "bg-white border-primary-300 hover:bg-primary-100"
            }`}
          >
            {year}
          </button>
        ))}
      </div>

      {/* PDFs o loader */}
      {loading ? (
        <p className="text-center text-gray-500">Cargando PDFs...</p>
      ) : filteredPdfs.length > 0 ? (
        <div className="flex flex-wrap justify-start items-start gap-6">
          {filteredPdfs.map((pdf) => (
            <div
              key={pdf.pdfId}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition px-8 py-4 flex flex-col items-center"
            >
              <a
                href={pdf.urlPdf}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex flex-col items-center"
              >
                <img
                  src={PdfImg}
                  alt={pdf.name}
                  className="w-20 h-20 mb-4 hover:scale-105 transition-transform"
                />
                <p className="text-center text-primary-700 font-medium">
                  {pdf.name}
                </p>
              </a>
              <span className="mt-2 text-sm text-gray-500">{pdf.age}</span>
            </div>
          ))}


          {selectedYear === "Todos" && (
            <button
              className="my-auto w-[120px] h-[120px] flex flex-col items-center justify-center rounded-lg border-2 border-basics-500 text-basics-700 text-center text-S-bold hover:bg-primary-100 hover:border-primary-500 transition-all duration-200 ease-out cursor-pointer"
              onClick={() => console.log("Subir nueva transparencia")}
            >
              <FontAwesomeIcon icon={faPlus} className="text-2xl mb-2" />
              <span>Subir nueva</span>
              <span>transparencia</span>
            </button>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No hay PDFs disponibles para {selectedYear}.
        </p>
      )}
    </div>
  );
};

export default Transparencias;
