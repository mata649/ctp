import Link from "next/link";
import React, { useState } from "react";
import { useFetchNews } from "../../hooks/useFetchNews";
import moment from "moment";
import "moment/locale/es";
const Index = () => {
  const [color, setColor] = useState(["#FC8800", "#00AAB5"]);
  const { news } = useFetchNews();
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-lg-8 offset-lg-2 ">
          {news.map(({ id, title, published }, index) => (
            <Link href={"/noticias/" + id} key={id} passHref>
              <div
                className="d-flex 
        justify-content-between noticia-card shadow"
                style={{ borderColor: color[index % 2] }}
              >
                <h4>{title}</h4>
                <h4>{moment(published).format("D MMMM YYYY")}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
