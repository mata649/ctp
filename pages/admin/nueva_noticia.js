import { convertToRaw } from "draft-js";
import { EditorState } from "draft-js";
import draftjsToHtml from "draftjs-to-html";
import Link from "next/link";
import React, { useState } from "react";
import { TextEditor } from "../../components/admin/news/TextEditor";
import { TextEditorContainer } from "../../components/admin/news/TextEditorContainer";
import { NewsService } from "../../client";
import Swal from "sweetalert2";
import { useRouter } from "next/router";

const NuevaNoticia = () => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState("");
  const router = useRouter();
  const handlePostNews = async () => {
    try {
      await NewsService.createNewsNewsPost({
        title: title,
        text: draftjsToHtml(convertToRaw(editorState.getCurrentContent())),
      });
      Swal.fire({
        title: "Éxito!!",
        text: "Noticia publicada con éxito",
        icon: "success",
      });
      router.push("/admin");
    } catch (error) {
      if (error.status == 400) {
        Swal.fire({
          title: "Error!!",
          text: "La noticia necesitar tener al menos un título",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Error!!",
          text: "Contacta al administrador",
          icon: "error",
        });
      }
    }
  };
  return (
    <div className="container">
      <TextEditorContainer>
        <input
          type="text"
          className="form-control text-center fs-2"
          placeholder="Titulo"
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextEditor editorState={editorState} setEditorState={setEditorState} />
        <div className="d-flex justify-content-between my-5">
          <button className="btn btn-primary" onClick={handlePostNews}>
            Publicar
          </button>
          <Link href="/admin">
            <a className="btn btn-secondary">Volver</a>
          </Link>
        </div>
      </TextEditorContainer>
    </div>
  );
};

export default NuevaNoticia;
