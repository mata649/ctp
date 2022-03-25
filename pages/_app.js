import NavbarCustom from "../components/general/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "/styles/globals.css";

import { useEffect } from "react";
//Provider
import { UserProvider } from "/components/context/userContext";
//Fontawesome
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { AppProvider } from "../components/context/appContext";
import { Footer } from "../components/general/Footer";

config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap")
      : null;
  }, []);

  return (
    <>
      <AppProvider>
        <UserProvider>
          <div className="d-flex flex-column min-vh-100">
          <NavbarCustom />
          <Component {...pageProps} />
          <Footer />
          </div>
        </UserProvider>
      </AppProvider>
    </>
  );
}

export default MyApp;
