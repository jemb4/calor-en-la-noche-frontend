import React from "react";

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  text: string;
}

const InfoCard: React.FC<InfoCardProps> = ({ icon, title, text }) => {
  return (
    <div className="bg-primary-100/90 shadow-md rounded-xl p-6 text-left hover:scale-[1.02] transition-transform">
      <div className="text-primary-700 text-2xl mb-3">{icon}</div>
      <h3 className="text-primary-700 font-bold text-lg mb-2">{title}</h3>
      <p className="text-primary-900 text-sm font-semibold">{text}</p>
    </div>
  );
};

export default InfoCard;