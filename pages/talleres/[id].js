import React, { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { WorkshopsService } from "../../client";
import { AppContext } from "../../components/context/appContext";
import { Carousel } from "../../components/general/Carousel";
import { BackgroundWave } from "../../components/general/BackgroundWave";
import { SpecialtyBackgroundBottom } from "../../components/backgroundSvgs/SpecialtyBackgroundBottom";
import { SpecialtyBackgroundTop } from "../../components/backgroundSvgs/SpecialtyBackgroundTop";
import parse from "html-react-parser";
const Taller = () => {
  const router = useRouter();

  const [workshop, setWorkshop] = useState(null);
  const { setLoading } = useContext(AppContext);

  const handleGetWorkshop = useCallback(async () => {
    try {
      setLoading(true);
      const { id } = router.query;
      if (id) {
        const response = await WorkshopsService.findWorkshopWorkshopsGet(id);

        setWorkshop(response);
        setLoading(false);
      }
    } catch (error) {}
  }, [router.query, setLoading]);

  useEffect(() => {
    handleGetWorkshop();
  }, [handleGetWorkshop, router.query.id]);

  return (
    <div className="container-fluid" style={{ padding: "0px" }}>
      {workshop?.title ? (
        <div>
          <h1 className="text-center my-4 ">{workshop.title}</h1>
          {workshop.images.length > 0 && (
            <div className="container">
              <div className="row">
                <div className="col-12 col-sm-8 offset-sm-2 ">
                  <Carousel images={workshop.images} />
                </div>
              </div>
            </div>
          )}
          <BackgroundWave
            bottom={<SpecialtyBackgroundBottom />}
            top={<SpecialtyBackgroundTop fillColor={workshop.color} />}
            bgColor={workshop.color}
          >
            <div className="container">{parse(workshop?.description)}</div>
          </BackgroundWave>
        </div>
      ) : (
        <h1 className="text-center m-3">El taller no existe</h1>
      )}
    </div>
  );
};

export default Taller;
