import React from "react";

interface Valor {
  title: string;
  desc: string;
}

const valors: Valor[] = [
  {
    title: "Identidad Lasaliana",
    desc: "Inspirados en los valores educativos y humanos de La Salle, promovemos la atención a los más vulnerables.",
  },
  {
    title: "Fraternidad",
    desc: "Fomentamos la unión y el respeto mutuo entre las personas voluntarias y las atendidas.",
  },
  {
    title: "Solidaridad",
    desc: "Nos comprometemos activamente con quienes más lo necesitan, ofreciendo tiempo, recursos y apoyo.",
  },
  {
    title: "Convivencia",
    desc: "Promovemos un entorno de respeto, tolerancia y cooperación mutua.",
  },
  {
    title: "Responsabilidad",
    desc: "Actuamos con compromiso y coherencia hacia nuestra misión social.",
  },
  {
    title: "Capacidad crítica",
    desc: "Reflexionamos sobre las causas de la exclusión para mejorar nuestras acciones y promover el cambio social.",
  },
  {
    title: "Diálogo",
    desc: "Escuchamos y compartimos experiencias para construir relaciones basadas en la comprensión.",
  },
  {
    title: "Cooperación",
    desc: "Colaboramos con entidades, instituciones y voluntariado para ampliar nuestro alcance.",
  },
  {
    title: "Transparencia",
    desc: "Gestionamos nuestros recursos con honestidad y claridad, rindiendo cuentas a la comunidad.",
  },
];

const ValorsGrid: React.FC = () => {
  return (
    <div className="pb-4">
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 cursor-default">
        {valors.map((valor) => (
          <li
            key={valor.title}
            className="bg-white shadow-md rounded-xl p-6 text-primary-700 hover:scale-[1.02] transition-transform"
          >
            <h3 className="text-M-bold mb-2">{valor.title}</h3>
            <p className="text-basics-700 text-S-regular leading-relaxed">
              {valor.desc}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ValorsGrid;
