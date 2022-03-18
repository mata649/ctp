import { Html, Head, Main, NextScript } from "next/document";
import { Footer } from "../components/general/Footer";

export default function Document() {
  return (
    <Html>
      <Head />
      <body className="d-flex flex-column min-vh-100">
        <Main />
        <NextScript />
        <div id="modal-root"></div>
        <Footer />
      </body>
    </Html>
  );
}
