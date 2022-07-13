import React, { useCallback, useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { NewsService } from "../../client";
import parse from "html-react-parser";
import { AppContext } from "../../components/context/appContext";
const Noticia = () => {
  const router = useRouter();

  const [news, setNews] = useState(null);
  const { setLoading } = useContext(AppContext);
  const handleGetNews = useCallback(async () => {
    try {
      setLoading(true);
      const { id } = router.query;
      const response = await NewsService.findNewsNewsGet(id);
      
      setNews(response);
      setLoading(false);
    } catch (error) {}
  }, [router.query, setLoading]);

  useEffect(() => {
    handleGetNews();
  }, [handleGetNews]);

  return (
    <div className="container">
      {news?.title ? (
        <div>
          <h1 className="text-center my-4">{news?.title}</h1>
          <div className="mt-4 p-2 news-container">
            {news?.id && parse(news?.text)}
          </div>
        </div>
      ) : (
        <h1 className="text-center m-3">La noticia no existe</h1>
      )}
    </div>
  );
};

export default Noticia;
