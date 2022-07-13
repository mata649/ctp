import React, { useContext } from "react";
import { UserContext } from "../components/context/userContext";
import parse from "html-react-parser";
const Admision = () => {
  const { generalInformation } = useContext(UserContext);
  return (
    <div className="container">
      <h1 className="text-center mt-4">Requisitos de Admisión</h1>
      <div className="mt-4 p-2">
        {generalInformation &&
          parse(generalInformation?.admission_requirements)}
      </div>
    </div>
  );
};

export default Admision;
