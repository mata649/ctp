import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../context/userContext";
import Link from 'next/link'
export const Footer = () => {
  const { generalInformation } = useContext(UserContext);
  return (
    <footer className="bg-dark text-center text-lg-start mt-auto custom-footer">
      <div className="container p-4">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">Administradores</h5>
            {generalInformation?.administrators?.map(({ name, position }) => (
              <p key={name}>
                {position}: {name}
              </p>
            ))}
            <Link href="/login">
              <a className="link-login">Ingresar al modulo interno
              </a></Link>
          </div>
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">Contacto</h5>
            <p>
              <FontAwesomeIcon
                icon={faLocationDot}
                className="mx-1 footer-icon"
              />
              <a
                target="_blank"
                href="https://www.google.com/maps/place/Colegio+T%C3%A9cnico+Profesional+Ca%C3%B1as/@10.4178486,-85.0876095,15z/data=!4m2!3m1!1s0x0:0x3a2c510d2fa60c5e?sa=X&ved=2ahUKEwjgv8e7nJn2AhV1QzABHb3AAb0Q_BJ6BAgeEAM"
                rel="noreferrer"
              >
                {generalInformation?.address}
              </a>
            </p>
            <p>
              <FontAwesomeIcon icon={faPhone} className="mx-1 footer-icon" />
              <a href={"tel:"+generalInformation?.telephone}> {generalInformation?.telephone}</a>
            </p>
            <p>
              <FontAwesomeIcon icon={faEnvelope} className="mx-1 footer-icon" />
              <a href={"mailto:"+generalInformation?.email}>{generalInformation?.email}</a>
            </p>
          </div>
        </div>
      </div>
      <div className="text-center p-3">
        © {new Date().getFullYear()} Copyright: Colegio Tecnico Profesional de
        Cañas
      </div>
    </footer>
  );
};
