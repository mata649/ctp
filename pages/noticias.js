import Link from "next/link";
import React, { useState } from "react";

const Noticias = () => {
  const [color, setColor] = useState(["#FC8800", "#00AAB5"]);
  const [noticias, setNoticias] = useState([
    { id: 1, title: "Formulario Beca 2022", published: "01/02/2022" },
    { id: 2, title: "Formulario Matricula  2022", published: "03/01/2022" },
    { id: 3, title: "Reglamento Uniforme", published: "24/02/2022" },
  ]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-lg-8 offset-lg-2 ">
          {noticias.map(({ id, title, published }, index) => (
            <Link href={"/noticias/" + id} key={id} passHref>
              <div
                className="d-flex 
        justify-content-between noticia-card"
                style={{ borderColor: color[index % 2] }}
              >
                <h4>{title}</h4>
                <h4>{published}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Noticias;
