import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "../context/userContext";
export default function NavbarCustom() {
  const { isLogged, logOut, userInfo } = useContext(UserContext);

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link href="/">
          <a className="navbar-brand">CTP Cañas</a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link href="/">
                <a className="nav-link" aria-current="page">
                  Inicio
                </a>
              </Link>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Requisitos
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <Link href="/becas">
                    <a className="dropdown-item">Becas</a>
                  </Link>
                </li>
                <li>
                  <Link href="/admision">
                    <a className="dropdown-item">Admisión</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <Link href="/noticias">
                <a className="nav-link" aria-current="page">
                  Noticias
                </a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/noticias">
                <a className="nav-link" aria-current="page">
                  Horarios
                </a>
              </Link>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Especialidades
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <Link href="/informatica">
                    <a className="dropdown-item">Informatica Empresarial</a>
                  </Link>
                </li>
                <li>
                  <Link href="/electronica">
                    <a className="dropdown-item">Electronica Industrial</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Talleres
              </a>
              <ul
                className="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <Link href="/informatica">
                    <a className="dropdown-item">Pequeños Muebles</a>
                  </Link>
                </li>
                <li>
                  <Link href="/informatica">
                    <a className="dropdown-item">Pequeños Muebles</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href="/docentes">
                <a className="nav-link">Docentes</a>
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            {isLogged && (
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Cuenta
                </a>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <li>
                    <Link href="/admin">
                      <a className="dropdown-item">Administración</a>
                    </Link>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      onClick={logOut}
                      style={{ cursor: "pointer" }}
                    >
                      Cerrar Sesión
                    </a>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
