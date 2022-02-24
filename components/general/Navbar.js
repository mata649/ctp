export default function NavbarCustom() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          CTP Cañas
        </a>
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
              <a className="nav-link" aria-current="page" href="/">
                Inicio
              </a>
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
                  <a className="dropdown-item" href="/becas">
                    Becas
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/admision">
                    Admisión
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/noticias">
                Noticias
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" aria-current="page" href="/noticias">
                Horarios
              </a>
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
                  <a className="dropdown-item" href="/informatica">
                    Informatica Empresarial
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/electronica">
                    Electronica Industrial
                  </a>
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
                  <a className="dropdown-item" href="/informatica">
                    Pequeños Muebles
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/electronica">
                    Diseño Digital
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/docentes">
                    Docentes
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
