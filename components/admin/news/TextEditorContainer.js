import React from "react";

export const TextEditorContainer = ({ children }) => {
  return (
    <div className="row">
      <div className="col-12 col-lg-8 offset-lg-2 mt-4">{children}</div>
    </div>
  );
};
