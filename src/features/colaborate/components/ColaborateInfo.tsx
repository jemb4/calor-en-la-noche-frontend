import React from "react";

interface ColaborateInfoProps {
  title: string;
}

const ColaborateInfo: React.FC<ColaborateInfoProps> = ({ title }) => {
  const infoMap: Record<string, string> = {
    Donación: `Con tu ayuda económica, podemos seguir ofreciendo alimentos, mantas y compañía a las personas sin hogar. 
          
    Transferencias al número de cuenta:

    **ES55 2103 4018 18 0030011373**`,

    Socio: `Si quieres ser socio de **"Calor en la Noche"** podrás hacerlo rellenando el documento de socio con tus datos personales. 
    Debes saber que las aportaciones son lo que cada uno pueda, desde 5 euros mensuales, a cualquier cantidad trimestral o anual.

    Haciéndote Socio tendrás voz y voto en las Asambleas de Socios, participando de esta y pudiendo ayudar a la Asociación a seguir su camino.`,

    Voluntario: `Si quieres ser voluntario existen varias modalidades:\n
    • **Voluntario observador:** muchos por nuestras cargas familiares o situación personal no disponemos de tiempo para poder salir a la calle a realizar la ruta de la asociación, pues una manera de colaborar es ir por la calle pendiente de ver quién y dónde duerme algún sin techo y comunicar su situación a la Asociación.\n
    • **Voluntario de intendencia:** igual que la anterior, otra modalidad sin salir a la calle es realizando el Caldo los viernes, entrando en los turnos de preparación de este, pues el caldo que llevamos a la calle es el caldo casero realizado con cariño. La asociación, la semana que te tocaría, le entregaría los termos para rellenar.\n
    • **Voluntario de calle:** este es el voluntario que sale los viernes en Cádiz y San Fernando y también los martes en San Fernando, a la calle, para realizar la labor de atención primaria, los que llevan el calor humano a los sin techos, a los que están en la calle. Para esto tendrías que rellenar una solicitud de Voluntario con tus datos para poder integrarte en uno de los equipos que salen en la calle.\n
    \nY todas estas modalidades no son excluyentes una de otras, pudiendo elegir una sola, dos o todas.`,
  };

  const rawText = infoMap[title] || "";

  const formattedText = rawText
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/•/g, "•&nbsp;")
    .replace(/\n/g, "<br />");

  return (
    <div
      className="text-basics-700 leading-relaxed whitespace-pre-line text-justify text-M-regular"
      dangerouslySetInnerHTML={{ __html: formattedText }}
    />
  );
};

export default ColaborateInfo;
