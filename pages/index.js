import React from "react";
import { useEffect, useState } from "react/cjs/react.production.min";
import { Carousel } from "../components/general/Carousel";

const Index = () => {
  const images = [
    "https://images.unsplash.com/photo-1506501139174-099022df5260?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1351&q=80",
    "https://images.unsplash.com/photo-1523438097201-512ae7d59c44?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1513026705753-bc3fffca8bf4?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1350&q=80",
  ];


  return (
    <div className="container">
      <h1 className="text-center mt-4 ">
        Bienvenidos al Colegio Técnico Profesional de Cañas
      </h1>
      <Carousel images={images} />
   
      <section className="mt-5 text-center fs-4 mx-5 p-5 my-5">
        <h1>Misión</h1>
        <p>
          Ser una institución reconocida a nivel regional, nacional e
          internacional, como la rectora del sistema educativo regional mediante
          el mejoramiento continuo de la gestión, con estándares modernos de
          eficacia, eficiencia y transparencia; orientada a la construcción de
          una sociedad inclusiva e integrada.
        </p>
      </section>
      <section className="text-center p-5 my-5 mx-5">
        <h1>Visión</h1>
        <p className="fs-4">
          Ser una institución reconocida a nivel regional, nacional e
          internacional, como la rectora del sistema educativo regional mediante
          el mejoramiento continuo de la gestión, con estándares modernos de
          eficacia, eficiencia y transparencia; orientada a la construcción de
          una sociedad inclusiva e integrada.
        </p>
      </section>
    </div>
  );
};

export default Index;
