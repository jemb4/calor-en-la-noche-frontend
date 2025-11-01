import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHandsHelping, faUsers } from "@fortawesome/free-solid-svg-icons";
import ColaborateInfo from "../components/ColaborateInfo";

const Colaborate: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const cards = [
    { title: "Donación", icon: faHeart },
    { title: "Socio", icon: faUsers },
    { title: "Voluntario", icon: faHandsHelping },
  ];

  const toggleCard = (title: string) => {
    setSelectedCard(selectedCard === title ? null : title);
  };

  return (
    <main className="min-h-[620px] bg-basics-50 text-basics-700 px-6 md:px-10 py-10 flex flex-col items-center">
      {/* Header */}
      <header className="max-w-5xl w-full mb-10 text-left">
        <h1 className="headline-M-bold text-primary-700 mb-4">
          Colabora con nosotros
        </h1>
        <p className="text-M-regular">
          Tienes varias opciones, escoge la que quieras.
        </p>
      </header>

      {/* Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-5xl w-full mb-8">
        {cards.map((card) => (
          <div
            key={card.title}
            onClick={() => toggleCard(card.title)}
            className={`bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer flex flex-col items-start p-6 border ${
              selectedCard === card.title
                ? "border-primary-700"
                : "border-transparent"
            }`}
          >
            <FontAwesomeIcon
              icon={card.icon}
              className="text-primary-700 text-2xl mb-3"
            />
            <h3 className="text-basics-900 font-semibold text-L-bold mb-2">
              {card.title}
            </h3>
            <p className="text-basics-500 text-S-regular">Pulsa para saber más</p>
          </div>
        ))}
      </section>

      {/* Contenido dinámico debajo */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden my-8 max-w-5xl w-full ${
          selectedCard ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {selectedCard && (
          <div className="bg-white rounded-2xl shadow-md p-8 animate-fadeIn">
            <h2 className="headline-S-bold text-primary-700 mb-4">
              {selectedCard}
            </h2>
            <ColaborateInfo title={selectedCard} />
          </div>
        )}
      </div>
    </main>
  );
};

export default Colaborate;
