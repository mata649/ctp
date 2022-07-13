import React, { useContext, useState } from "react";

import { UserContext } from "../components/context/userContext";
const Horarios = () => {

  const { generalInformation } = useContext(UserContext);

  console.log(generalInformation?.schedule_link);
  return (
    <div className="container">
     
          <h1 className="text-center mb-2">Horarios</h1>
        {generalInformation?.schedule_link ? (
          <div className="d-flex justify-content-center mb-5">
          <iframe 
            src={generalInformation.schedule_link}
            style={{height: "600px", width: "80%"}}
            allow="autoplay"
          ></iframe>
          </div>
        ) : (
          <h3>Horario no disponible</h3>
        )}
   
    </div>
  );
};

export default Horarios;
