import React, { useCallback, useContext, useEffect, useState } from "react";
import { GeneralInformationService } from "../client";
import { AppContext } from "../components/context/appContext";

export const useFetchGeneralInformation = () => {
  const [generalInformation, setGeneralInformation] = useState();
  const { setLoading } = useContext(AppContext);
  
  
  
  
  const handleGetGeneralInformation = useCallback(async () => {
    try {
      let response = null;
      setLoading(true);
      response =await GeneralInformationService.getGeneralInformationGeneralInformationGet();
      setGeneralInformation(response);
    } catch (error) {
      setGeneralInformation({})
    }

    setLoading(false);
  }, [setLoading]);


  useEffect(() => {
    handleGetGeneralInformation();
  }, [handleGetGeneralInformation]);
  return {generalInformation, handleGetGeneralInformation}
  
};
