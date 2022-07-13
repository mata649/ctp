import { convertToRaw } from "draft-js";
import { EditorState } from "draft-js";
import draftjsToHtml from "draftjs-to-html";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import { TextEditor } from "../../components/admin/news/TextEditor";
import { TextEditorContainer } from "../../components/admin/news/TextEditorContainer";
import { NewsService } from "../../client";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useHtmlToDraftBlocks } from "../../hooks/useHtmlToDraftBlocks";
import { useIsAdmin } from "../../hooks/useIsAdmin";
import { AppContext } from "../../components/context/appContext";

const NoticiaForm = () => {
  const router = useRouter();
  const newsInfo = router.query;
  const contentState = useHtmlToDraftBlocks(newsInfo?.text);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [title, setTitle] = useState(newsInfo ? newsInfo.title : "");
  const { setLoading } = useContext(AppContext);
  useIsAdmin();
  useEffect(() => {
    if (contentState) {
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [contentState]);
  
  const handlePostNews = async () => {
    setLoading(true);
    try {
      await NewsService.createNewsNewsPost({
        title: title,
        text: draftjsToHtml(convertToRaw(editorState.getCurrentContent())),
      });
      Swal.fire({
        title: "Éxito!!",
        text: "Noticia publicada",
        icon: "success",
      });
      router.push("/admin");
    } catch (error) {
      if (error.status == 400 || error.status == 422) {
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
    setLoading(false);
  };

  const handleUpdateNews = async () => {
    setLoading(true);
    try {
      await NewsService.updateNewsNewsNewsIdPut(newsInfo.id, {
        title: title,
        text: draftjsToHtml(convertToRaw(editorState.getCurrentContent())),
      });
      Swal.fire({
        title: "Éxito!!",
        text: "Noticia actualizada con éxito",
        icon: "success",
      });
      router.push("/admin");
    } catch (error) {
      if (error.status == 400 || error.status == 422) {
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
    setLoading(false);
  };
  return (
    <div className="container">
      <TextEditorContainer>
        <input
          type="text"
          className="form-control text-center fs-2"
          placeholder="Titulo"
          defaultValue={newsInfo?.id ? newsInfo.title : ""}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextEditor editorState={editorState} setEditorState={setEditorState} />
        <div className="d-flex justify-content-between my-5">
          <button
            className="btn btn-primary"
            onClick={!newsInfo?.id ? handlePostNews : handleUpdateNews}
          >
            {!newsInfo?.id ? "Publicar" : "Actualizar"}
          </button>
          <Link href="/admin">
            <a className="btn btn-secondary">Volver</a>
          </Link>
        </div>
      </TextEditorContainer>
    </div>
  );
};

export default NoticiaForm;
