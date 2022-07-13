import React, { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { SpecialtiesService } from "../../client";
import { AppContext } from "../../components/context/appContext";
import { Carousel } from "../../components/general/Carousel";
import { BackgroundWave } from "../../components/general/BackgroundWave";
import { SpecialtyBackgroundBottom } from "../../components/backgroundSvgs/SpecialtyBackgroundBottom";
import { SpecialtyBackgroundTop } from "../../components/backgroundSvgs/SpecialtyBackgroundTop";
import parse from "html-react-parser";
const Especialidad = () => {
  const router = useRouter();

  const [specialty, setSpecialty] = useState(null);
  const { setLoading } = useContext(AppContext);

  const handleGetSpecialty = useCallback(async () => {
    try {
      setLoading(true);
      const { id } = router.query;
      if (id) {
        const response = await SpecialtiesService.findSpecialtySpecialtiesGet(
          id
        );

        setSpecialty(response);
        setLoading(false);
      }
    } catch (error) {}
  }, [router.query, setLoading]);

  useEffect(() => {
    handleGetSpecialty();
  }, [handleGetSpecialty, router.query.id]);

  return (
    <div className="container-fluid" style={{ padding: "0px" }}>
      {specialty?.title ? (
        <div>
          <h1 className="text-center my-4 ">{specialty.title}</h1>
          {specialty.images.length > 0 && (
            <div className="container">
              <div className="row">
                <div className="col-12 col-sm-8 offset-sm-2 ">
                  <Carousel images={specialty.images} />
                </div>
              </div>
            </div>
          )}
          <BackgroundWave
            bottom={<SpecialtyBackgroundBottom />}
            top={<SpecialtyBackgroundTop fillColor={specialty.color} />}
            bgColor={specialty.color}
          >
            <div className="container">{parse(specialty?.description)}</div>
          </BackgroundWave>
          {specialty.recommended_skills.length > 0 && (
            <div className="mb-5">
              <h2 className="text-center fw-bold">Habilidades Recomendadas</h2>
              <div className="d-flex justify-content-center">
                <ul className="fs-2">
                  {specialty.recommended_skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      ) : (
        <h1 className="text-center m-3">La especialidad no existe</h1>
      )}
    </div>
  );
};

export default Especialidad;
