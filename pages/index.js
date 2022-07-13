import React, { useContext } from "react";
import { UserContext } from "../components/context/userContext";
import { Carousel } from "../components/general/Carousel";
import { MissionBackgroundTop } from "/components/backgroundSvgs/MissionBackgroundTop";
import { MissionBackgroundBottom } from "/components/backgroundSvgs/MissionBackgroundBottom";
import { VisionBackgroundTop } from "/components/backgroundSvgs/VisionBackgroundTop";
import { VisionBackgroundBottom } from "/components/backgroundSvgs/VisionBackgroundBottom";
import { BackgroundWave } from "../components/general/BackgroundWave";
const Index = () => {
  const { generalInformation } = useContext(UserContext);
  return (
    <div className="container-fluid" style={{ padding: "0px" }}>
      <h1 className="text-center my-4 ">
        Bienvenidos al Colegio Técnico Profesional de Cañas
      </h1>
      <div className="container">
        <Carousel images={generalInformation?.carousel_images} />
      </div>
      <section className=" text-center ">
        <BackgroundWave
          bgColor="#00aab5"
          bottom={<MissionBackgroundBottom />}
          top={<MissionBackgroundTop />}
        >
          <h1 className="mb-5 fw-bold ">Misión</h1>
          <p className="fs-4">
            El Colegio Técnico Profesional Cañas de la Dirección Regional Cañas,
            Circuito Escolar 01, con el aporte del Ministerio de Educación
            Pública, Comunidad Educativa, Junta Administrativa y Empresas de la
            zona, ofrece formación integral, hacia el reto de enfrentar y
            solucionar nuevos paradigmas, con el objetivo de incorporar
            individuos proactivos al mercado laboral. Como Institución educativa
            brindamos un proceso de enseñanza – aprendizaje enfocado hacia la
            calidad y excelencia, mediante convenios, programas pertinentes y
            personal comprometido, talleres de fortalecimiento y gestión
            oportuna ante los requerimientos de la globalización.
          </p>
        </BackgroundWave>
      </section>
      <section className="text-center ">
        <BackgroundWave
          bgColor="#f87700"
          bottom={<VisionBackgroundBottom />}
          top={<VisionBackgroundTop />}
        >
          <h1 className="mb-5 fw-bold">Visión</h1>
          <p className="fs-4">
            Ser una alternativa educativa técnica profesional para la provincia
            de Guanacaste, cuya formación ética, profesional y humanista,
            permita contribuir al desarrollo competitivo de individuos capaces
            de generar productividad y calidad del conocimiento; mediante el
            mejoramiento continuo, propiciando en el educando bienestar físico,
            intelectual, cognitivo, y socio afectivo, para competir con éxito en
            el mercado laboral, local, nacional e internacional.
          </p>
        </BackgroundWave>
      </section>
    </div>
  );
};

export default Index;
