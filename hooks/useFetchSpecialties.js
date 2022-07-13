import { useCallback, useContext, useEffect, useState } from "react";
import { SpecialtiesService } from "../client";
import { AppContext } from "../components/context/appContext";

export const useFetchSpecialties = () => {
  const [specialties, setSpecialties] = useState([]);
  const [title, setTitle] = useState("");
  const { setLoading } = useContext(AppContext);
  const handleGetSpecialties = useCallback(async () => {
    try {
      let response = null;
      setLoading(true);
      if (title.length > 0) {
        response = await SpecialtiesService.findSpecialtySpecialtiesGet(
          undefined,
          title
        );
        Array.isArray(response)
          ? setSpecialties(response)
          : setSpecialties([response]);
      } else {
        response = await SpecialtiesService.findSpecialtySpecialtiesGet();
      }
      Array.isArray(response)
        ? setSpecialties(response)
        : setSpecialties([response]);
    } catch (error) {
      console.log(error);
      setSpecialties([]);
    }
    setLoading(false);
  }, [setLoading, title]);

  useEffect(() => {
    handleGetSpecialties();
  }, [handleGetSpecialties, title]);
  return {
    setTitle,
    specialties,
    handleGetSpecialties,
    setSpecialties,
  };
};
