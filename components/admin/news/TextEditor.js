import React, { Component, useState } from "react";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";

const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

export const TextEditor = ({ editorState, setEditorState }) => {
  const handleEditorChange = (newEditorState) => {
    setEditorState(newEditorState);
  };
  return (
    <div className="border border mt-2 ">
      <Editor
        editorState={editorState}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={handleEditorChange}
        editorStyle={{
          height: "400px",
        }}
      />
    </div>
  );
};
