import React, { useContext } from "react";
import { UserContext } from "../components/context/userContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChalkboardTeacher } from "@fortawesome/free-solid-svg-icons";
const Docentes = () => {
  const { generalInformation } = useContext(UserContext);
  console.log(generalInformation);
  return (
    <div className="container">
      <div className="d-flex justify-content-center mt-5">
        {generalInformation?.teachers_link ? (
          <a
            href={generalInformation.teachers_link}
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faChalkboardTeacher}
              className="admin-module p-4"
              style={{color:"orange", height: "140px"}}
            />
          </a>
        ) : (
          <h2>La dirección de docentes no existen</h2>
        )}
      </div>
    </div>
  );
};

export default Docentes;
