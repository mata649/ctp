import { ContentState } from "draft-js";
import draftjsToHtml from "draftjs-to-html";
import { useEffect, useState } from "react";

export const useHtmlToDraftBlocks = (html) => {
  let htmlToDraft = null;
  if (typeof window === "object") {
    htmlToDraft = require("html-to-draftjs").default;
  }

  const [contentState, setContentState] = useState(null);
  useEffect(() => {
    if (draftjsToHtml && html) {
      const blocksFromHtml = htmlToDraft(html);
      const { contentBlocks, entityMap } = blocksFromHtml;
      setContentState(
        ContentState.createFromBlockArray(contentBlocks, entityMap)
      );
    }
  }, [html, htmlToDraft]);

  return contentState;
};
