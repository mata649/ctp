import { useCallback, useContext, useEffect, useState } from "react";
import { WorkshopsService } from "../client";
import { AppContext } from "../components/context/appContext";

export const useFetchWorkshops = () => {
  const [workshops, setWorkshops] = useState([]);
  const [title, setTitle] = useState("");
  const {setLoading} = useContext(AppContext)
  const handleGetWorkshops = useCallback(async () => {
    try {
      let response = null;
      setLoading(true)
      if (title.length > 0) {
        response = await WorkshopsService.findWorkshopWorkshopsGet(
          undefined,
          title
        );
        Array.isArray(response)
          ? setWorkshops(response)
          : setWorkshops([response]);
      } else {
        response = await WorkshopsService.findWorkshopWorkshopsGet();

      }
      Array.isArray(response) ? setWorkshops(response) : setWorkshops([response]);
    } catch (error) {
      console.log(error)
        setWorkshops([]);
    }
    setLoading(false)
  }, [setLoading, title]);

  useEffect(() => {
    handleGetWorkshops();
  }, [handleGetWorkshops, title]);
  return {
    setTitle,
    workshops,
    handleGetWorkshops,
    setWorkshops,
  };
};
