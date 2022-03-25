import { Html, Head, Main, NextScript } from "next/document";
import { Footer } from "../components/general/Footer";

export default function Document() {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
        <div id="modal-root"></div>
        
      </body>
    </Html>
  );
}
