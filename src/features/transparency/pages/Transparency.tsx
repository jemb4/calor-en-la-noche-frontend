import React, { useEffect, useState } from "react";
import { getAllPdfs, type PdfItem, deletePdf } from "../services/pdfService";
import PdfImg from "../assets/pdf-file.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";
import LoginModal from "../components/LoginModal";
import DeleteModal from "../components/DeleteModal";
import UploadPdfModal from "../components/UploadPdfModal";
import { getAuthUser, logout } from "../../auth/services/authService";

const Transparency: React.FC = () => {
  const [pdfs, setPdfs] = useState<PdfItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState<string>("Todos");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [user, setUser] = useState<{ email: string; role: string } | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [pdfToDelete, setPdfToDelete] = useState<PdfItem | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

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

    const authUser = getAuthUser();
    if (authUser) setUser(authUser);
  }, []);

  const years = Array.from(new Set(pdfs.map((pdf) => pdf.age))).sort(
    (a, b) => Number(b) - Number(a)
  );

  const filteredPdfs =
    selectedYear === "Todos"
      ? pdfs
      : pdfs.filter((pdf) => pdf.age === selectedYear);

  const handleLogout = () => {
    logout();
    setUser(null);
  };

  const openDeleteModal = (pdf: PdfItem) => {
    setPdfToDelete(pdf);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!pdfToDelete) return;

    try {
      await deletePdf(pdfToDelete.pdfId);
      setPdfs((prev) => prev.filter((p) => p.pdfId !== pdfToDelete.pdfId));
    } catch (error) {
      alert("Error al eliminar el PDF. Verifica tus permisos o la conexión: " + error);
    } finally {
      setIsDeleteOpen(false);
      setPdfToDelete(null);
    }
  };

  return (
    <div className="mb-60 bg-basics-50 text-M-regular text-basics-700 px-6 md:px-10 py-10">
      <div className="max-w-5xl mx-auto relative">
        <h1 className="headline-M-bold text-primary-700 mb-4">Transparencias</h1>
        <h2 className="title-XL-bold text-basics-700 mb-14">
          Encuentra la información que buscas en nuestros PDFs descargables
        </h2>

        {/* Access / Logout */}
        {!user ? (
          <button
            className="absolute top-[120px] right-10 text-primary-500 text-M-regular hover:text-basics-900 hover:underline transition-colors z-10 cursor-pointer"
            onClick={() => setIsLoginOpen(true)}
          >
            Acceder
          </button>
        ) : (
          <button
            className="absolute top-[120px] right-10 text-primary-700 text-M-regular hover:text-red-600 hover:underline transition-colors z-10 cursor-pointer"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        )}

        {/* Filter */}
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

        {/* PDFs or Loader */}
        {loading ? (
          <p className="text-center text-gray-500">Cargando PDFs...</p>
        ) : filteredPdfs.length > 0 ? (
          <div className="flex flex-wrap justify-start items-start gap-6 text-M-bold">
            {user && selectedYear === "Todos" && (
              <button
                className="my-auto w-[120px] h-[120px] flex flex-col items-center justify-center rounded-lg border-2 border-basics-500 text-basics-700 text-center text-S-bold hover:bg-primary-100 hover:border-primary-500 transition-all duration-200 ease-out cursor-pointer"
                onClick={() => setIsUploadOpen(true)}
              >
                <FontAwesomeIcon icon={faPlus} className="text-2xl mb-2" />
                <span>Subir nueva</span>
                <span>transparencia</span>
              </button>
            )}

            {filteredPdfs.map((pdf) => (
              <div
                key={pdf.pdfId}
                className="relative bg-white rounded-2xl shadow-md hover:shadow-lg transition px-8 py-4 flex flex-col items-center"
              >
                {user && (
                  <button
                    onClick={() => openDeleteModal(pdf)}
                    className="absolute top-3 right-3 text-primary-500 hover:text-primary-700 transition cursor-pointer hover:scale-125"
                  >
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                )}

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
                  <p className="text-center text-primary-700 text-M-bold">
                    {pdf.name}
                  </p>
                </a>
                <span className="mt-2 text-S-bold text-basics-700">{pdf.age}</span>
              </div>
            ))}

            {/* Modals */}
            <LoginModal
              isOpen={isLoginOpen}
              onClose={() => {
                setIsLoginOpen(false);
                const authUser = getAuthUser();
                if (authUser) setUser(authUser);
              }}
            />

            <DeleteModal
              isOpen={isDeleteOpen}
              onClose={() => setIsDeleteOpen(false)}
              onConfirm={handleConfirmDelete}
              pdfName={pdfToDelete?.name}
            />

            <UploadPdfModal
              isOpen={isUploadOpen}
              onClose={() => setIsUploadOpen(false)}
              onUploadSuccess={() => {
                setIsUploadOpen(false);
                getAllPdfs().then((data) => setPdfs(data));
              }}
            />
          </div>
        ) : (
          <p className="text-center text-gray-500 text-L-regular">
            No hay PDFs disponibles para {selectedYear}.
          </p>
        )}
      </div>
    </div>
  );
};

export default Transparency;
