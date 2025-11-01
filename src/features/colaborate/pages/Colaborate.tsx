import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faHandsHelping, faUsers } from "@fortawesome/free-solid-svg-icons";

const Colaborate: React.FC = () => {
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const cards = [
    {
      title: "Donación",
      icon: faHeart,
      text: `Con tu ayuda económica, podemos seguir ofreciendo alimentos, mantas y compañía a las personas sin hogar. 
      
      Transferencias al número de cuenta:

      **ES55 2103 4018 18 0030011373**`,
    },
    {
      title: "Socio",
      icon: faUsers,
      text: `Si quieres ser socio de **"Calor en la Noche"** podrás hacerlo rellenando el documento de socio con tus datos personales. 
      Debes saber que las aportaciones son lo que cada uno pueda, desde 5 euros mensuales, a cualquier cantidad trimestral o anual.

      Haciéndote Socio tendrás voz y voto en las Asambleas de Socios, participando de esta y pudiendo ayudar a la Asociación a seguir su camino.`,
    },
    {
      title: "Voluntario",
      icon: faHandsHelping,
      text: `Si quieres ser voluntario existen varias modalidades:\n
      • **Voluntario observador:** muchos por nuestras cargas familiares o situación personal no disponemos de tiempo para poder salir a la calle a realizar la ruta de la asociación, pues una manera de colaborar es ir por la calle pendiente de ver quién y dónde duerme algún sin techo y comunicar su situación a la Asociación.\n
      • **Voluntario de intendencia:** igual que la anterior, otra modalidad sin salir a la calle es realizando el Caldo los viernes, entrando en los turnos de preparación de este, pues el caldo que llevamos a la calle es el caldo casero realizado con cariño. La asociación, la semana que te tocaría, le entregaría los termos para rellenar.\n
      • **Voluntario de calle:** este es el voluntario que sale los viernes en Cádiz y San Fernando y también los martes en San Fernando, a la calle, para realizar la labor de atención primaria, los que llevan el calor humano a los sin techos, a los que están en la calle. Para esto tendrías que rellenar una solicitud de Voluntario con tus datos para poder integrarte en uno de los equipos que salen en la calle.\n
      \nY todas estas modalidades no son excluyentes una de otras, pudiendo elegir una sola, dos o todas.`,
    },
  ];

  const toggleCard = (title: string) => {
    setSelectedCard(selectedCard === title ? null : title);
  };

  const getSelectedCardText = (title: string | null) => {
    const card = cards.find((c) => c.title === title);
    if (!card) return "";

    return card.text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/•/g, "•&nbsp;")
      .replace(/\n/g, "<br />");
  };

  return (
    <main className="min-h-[620px] bg-basics-50 text-basics-700 px-6 md:px-10 py-10 flex flex-col items-center">
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
            <h3 className="text-basics-900 font-semibold text-lg mb-2">
              {card.title}
            </h3>
            <p className="text-basics-500 text-sm">Pulsa para saber más</p>
          </div>
        ))}
      </section>

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
            <div
              className="text-basics-700 leading-relaxed whitespace-pre-line text-justify"
              dangerouslySetInnerHTML={{
                __html: getSelectedCardText(selectedCard),
              }}
            />
          </div>
        )}
      </div>
    </main>
  );
};

export default Colaborate;
