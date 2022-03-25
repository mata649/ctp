import React, { useCallback, useContext, useEffect, useState } from "react";
import { NewsService } from "../client";
import { AppContext } from "../components/context/appContext";

export const useFetchNews = () => {
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState("");
  const {setLoading} = useContext(AppContext)
  const handleGetNews = useCallback(async () => {
    try {
      let response = null;
      setLoading(true)
      if (title.length > 0) {
        response = await NewsService.findNewsNewsGet(undefined, title);
        Array.isArray(response) ? setNews(response) : setNews([response]);
      } else {
        response = await NewsService.findNewsNewsGet();
      }
      Array.isArray(response) ? setNews(response) : setNews([response]);
    } catch (error) {
      setNews([]);
    }
    setLoading(false)
  }, [setLoading, title]);

  useEffect(() => {
    handleGetNews();
  }, [handleGetNews, title]);
  return {
    setTitle,
    news,
    handleGetNews,
    setNews,
  };
};
