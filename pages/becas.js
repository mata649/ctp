import React, { useContext } from "react";
import { UserContext } from "../components/context/userContext";
import parse from "html-react-parser";
const Becas = () => {
  const { generalInformation } = useContext(UserContext);
 
  return (
    <div className="container">
      <h1 className="text-center mt-4">Requisitos de Beca</h1>
      <div className="mt-4 p-2">{generalInformation && parse(generalInformation?.scholarship_requirements)}</div>
    </div>
  );
};

export default Becas;
