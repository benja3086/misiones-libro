import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./Inicio.css";

import imagen from "../../assets/fondo-blanco.png";
import imagen1 from "../../assets/Logo-verde.png";
import imagen2 from "../../assets/MisionGlobal.png";

const slides = [
 
 // { src: imagen2, className: "banner-img" },
  
];

const Inicio = () => {
  return (
    <div className="productos">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        pagination={{ clickable: true }}
        loop={true}
        grabCursor
        className="carousel-simple"
      >
        {slides.map(({ src, className }, i) => (
          <SwiperSlide key={i}>
            <img
              src={src}
              alt={`Slide ${i + 1}`}
              className={className}
              style={{ width: "100%", height: "auto" }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="productos-container">
        <img className="logo3" src={imagen1} alt="Logo de misiones" />
        <div className="productos-texto">
          <p>
            Somos el <strong>Ministerio de Misiones</strong> de Iglesia de Cristo Pje
            Padilla.
          </p>
          <p>
            Trabajamos para ver una iglesia comprometida en obedecer el llamado de Jesús
            de hacer discípulos hasta lo último de la tierra.
          </p>
          <p>
            Además, nos enfocamos en el cuidado integral de nuestros misioneros en el
            campo y acompañamos a los candidatos en su proceso de preparación.
          </p>
          <p>
            Las finanzas son un área clave para desarrollar el plan de Dios y sostener a
            nuestros misioneros. Por eso, creamos esta tienda:{" "}
            <strong>
              cada compra apoya directamente a los misioneros y candidatos de nuestra
              iglesia local.
            </strong>
          </p>
          <h2>¡Gracias por ser parte!</h2>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
