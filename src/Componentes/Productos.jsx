import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";


import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "./Productos.css";

import imagen from "../assets/fondo-blanco.png";
import imagen1 from "../assets/Logo-verde.png";
import imagen2 from "../assets/MisionGlobal.png";

const slides = [
  { src: "https://imgs.search.brave.com/NYtXQ3ewKy0F_jLPXMjgXthpRgO0cnqT3rEY1UbhoxE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9zdGF0/aWMud2lraWEubm9j/b29raWUubmV0L25h/cm5pYS9pbWFnZXMv/Mi8yYi9MYXNfQ3Il/QzMlQjNuaWNhc19k/ZV9OYXJuaWFfRWxf/TGUlQzMlQjNuLF9s/YV9CcnVqYV95X2Vs/X0FybWFyaW9fKFRy/YWlsZXJfZXNwYSVD/MyVCMW9sKS9yZXZp/c2lvbi9sYXRlc3Qv/c2NhbGUtdG8td2lk/dGgtZG93bi8yNTA_/Y2I9MjAxODAzMDgx/ODM1MTgmcGF0aC1w/cmVmaXg9ZXM", className: "banner-img" },
  { src: imagen2,                                  className: "banner-img" },
  { src: "https://via.placeholder.com/600x200/90ee90/fff?text=Slide+3", className: "banner-img" },
];

<div className="carousel">
  {slides.map(({ src, className }, i) => (
    <img key={i} src={src} alt={`Slide ${i + 1}`} className={className} />
  ))}
</div>

const Productos = () => {
 return (
  <div className="productos">
  <Swiper
  modules={[Autoplay, Pagination]}
  autoplay={{ delay: 2500, disableOnInteraction: false, pauseOnMouseEnter: true }}
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
          Somos el <strong>Ministerio de Misiones</strong> de Iglesia de Cristo Pje Padilla.
        </p>
        <p>
          Trabajamos para ver una iglesia comprometida en obedecer el llamado de Jesús
          de hacer discípulos hasta lo último de la tierra.
        </p>
        <p>
          Además, nos enfocamos en el cuidado integral de nuestros misioneros en el campo
          y acompañamos a los candidatos en su proceso de preparación.
        </p>
        <p>
          Las finanzas son un área clave para desarrollar el plan de Dios y sostener
          a nuestros misioneros. Por eso, creamos esta tienda: <strong>cada compra apoya
          directamente a los misioneros y candidatos de nuestra iglesia local.</strong>
        </p>
        <h2>¡Gracias por ser parte!</h2>
      </div>
    </div>
  </div>
);
}

export default Productos;
