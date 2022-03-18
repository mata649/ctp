import React, { useCallback, useEffect, useState } from "react";
import { NewsService } from "../client";

export const useFetchNews = () => {
  const [news, setNews] = useState([]);
  const [title, setTitle] = useState("");
  const handleGetNews = useCallback(async () => {
    try {
      const response = await NewsService.findNewsNewsGet({ title });
      setNews(response);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, [title]);

  useEffect(() => {
    handleGetNews();
  }, [handleGetNews, title]);
  return {
    setTitle,
    news,
    handleGetNews,
  };
};
