import React from "react"
import Bank from "../assets/nightbank.png"
import HomeCard from "../components/HomeCard"
import { Link } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faCommentDots, faLink } from "@fortawesome/free-solid-svg-icons";

const HomePage: React.FC = ()=> {
  return(
    <div className="flex flex-col">
      
      {/* HERO SECTION */}
      <section className="flex flex-col-reverse md:flex-row items-stretch">
  
        <div className="flex-1 p-8 md:p-16 text-center md:text-left bg-secondary-100 flex flex-col justify-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900">
            Esta noche, alguien dormirá aquí
          </h1>
          <p className="text-gray-600 text-base md:text-lg mb-6">
            La realidad de las personas sin hogar es más cercana de lo que piensas.
            Descubre cómo puedes marcar la diferencia.
          </p>
          {/* TODO put links into LINK */}
          <Link
            to="" 
            className="bg-primary-700 cursor-pointer hover:bg-success-700 text-basics-100 px-6 py-3 rounded-full font-semibold transition"
          >
            Donar ahora
          </Link>
        </div>

        <div className="flex-1 h-[418px] md:h-auto overflow-hidden">
          <img
            src={Bank}
            alt="Persona sin hogar"
            className="w-full h-full object-cover object-left"
          />
        </div>
      </section>


      {/* DATA SECTION */}
      <section className="py-16 px-6 bg-basics-100 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-10 text-gray-900">
          La dura realidad:
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-lg font-bold text-primary-500 mb-2">
              Personas sin hogar en España
            </h3>
            <p className="text-gray-700 text-2xl font-semibold">+28.000</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-lg font-bold text-primary-500 mb-2">
              Noches de servicio
            </h3>
            <p className="text-gray-700 text-2xl font-semibold">+300</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-lg font-bold text-primary-500 mb-2">
              Comidas servidas
            </h3>
            <p className="text-basics-700 text-2xl font-semibold">+10.000</p>
          </div>
        </div>
      </section>

      {/* QA SECTION */}
    <section className="py-16 px-6 md:px-16 bg-secondary-100 flex flex-col items-center gap-10">
      {/* Text */}
      <div className="max-w-2xl text-center flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 text-basics-900">
          Qué hacemos desde Calor en la Noche
        </h2>
        <p className="text-basics-700 mb-6 leading-relaxed">
          Brindamos apoyo esencial, compañía y recursos a quienes más lo necesitan directamente en las calles.
        </p>
        <Link 
         to="/"
         className="bg-basics-900 hover:bg-primary-500 text-basics-100 px-6 py-3 rounded-full font-semibold transition cursor-pointer"
        >
          Conoce nuestra misión
        </Link>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 max-w-5xl w-full">
        <HomeCard
          icon={<FontAwesomeIcon icon={faUtensils} />}
          title="Comida y Abrigo"
          text="Distribuimos comidas calientes, bebidas y ropa de abrigo todas las noches."
        />

        <HomeCard
          icon={<FontAwesomeIcon icon={faCommentDots} />}
          title="Apoyo Emocional"
          text="Ofrecemos una conversación amable y un oído atento para combatir la soledad."
        />

        <HomeCard
          icon={<FontAwesomeIcon icon={faLink} />}
          title="Recursos"
          text="Conectamos a las personas con servicios de salud, refugios y oportunidades."
        />
      </div>
    </section>

    </div>
  )
}

export default HomePage;