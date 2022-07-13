import React, { useContext, useEffect, useState } from "react";
import { TextEditor } from "../../components/admin/news/TextEditor";
import { TextEditorContainer } from "../../components/admin/news/TextEditorContainer";
import { convertToRaw, EditorState } from "draft-js";
import { UserContext } from "../../components/context/userContext";
import { useHtmlToDraftBlocks } from "../../hooks/useHtmlToDraftBlocks";
import { useIsAdmin } from "../../hooks/useIsAdmin";
import draftjsToHtml from "draftjs-to-html";
import Link from "next/link";
import { AppContext } from "../../components/context/appContext";
import Swal from "sweetalert2";
import { GeneralInformationService } from "../../client";
import { useRouter } from "next/router";

const RequisitosAdmision = () => {
  const { generalInformation, handleGetGeneralInformation } =
    useContext(UserContext);
  let contentState = useHtmlToDraftBlocks(
    generalInformation?.admission_requirements
  );
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const { setLoading } = useContext(AppContext);
  const router = useRouter();
  useIsAdmin();
  useEffect(() => {
    if (contentState) {
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [contentState]);
  const handleUpdateGeneralInformation = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await GeneralInformationService.updateGeneralInformationGeneralInformationPut(
        {
          ...generalInformation,
          admission_requirements: draftjsToHtml(
            convertToRaw(editorState.getCurrentContent())
          ),
        }
      );
      Swal.fire({
        title: "Éxito!!",
        text: "Información Actualizada",
        icon: "success",
      });
      handleGetGeneralInformation();
      router.push("/admin");
    } catch (error) {
      console.log(error);
      if (error.status == 400 || error.status == 422) {
        Swal.fire({
          title: "Error!!",
          text: "Se debe tener al menos un correo, dirección y teléfono",
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
      <h1 className="text-center mt-5">Requisitos de Admisión</h1>
      <TextEditorContainer>
        <TextEditor editorState={editorState} setEditorState={setEditorState} />
        <div className="d-flex justify-content-between my-5">
          <button
            className="btn btn-primary"
            onClick={handleUpdateGeneralInformation}
          >
            Actualizar
          </button>
          <Link href="/admin/informacion_general">
            <a className="btn btn-secondary">Volver</a>
          </Link>
        </div>
      </TextEditorContainer>
    </div>
  );
};

export default RequisitosAdmision;
