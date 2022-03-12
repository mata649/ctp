import NavbarCustom from "../components/general/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import "/styles/globals.css";
import { useEffect } from "react";
import { Footer } from "../components/general/Footer";

//Fontawesome
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    typeof document !== undefined
      ? require("bootstrap/dist/js/bootstrap")
      : null;
  }, []);
  return (
    <>
      <NavbarCustom />
      <Component {...pageProps} />
     
    </>
  );
}

export default MyApp;
