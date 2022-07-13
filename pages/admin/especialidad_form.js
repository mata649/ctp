import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { UserContext } from "../../components/context/userContext";
import { AppContext } from "../../components/context/appContext";
import { ImageCustom } from "../../components/general/ImageCustom";
import { ColorPicker } from "../../components/general/ColorPicker";
import { SpecialtiesService } from "../../client";
import Swal from "sweetalert2";
import { uploadImage } from "../../helpers/uploadImage";
import { useHtmlToDraftBlocks } from "../../hooks/useHtmlToDraftBlocks";
import draftjsToHtml from "draftjs-to-html";
import { convertToRaw, EditorState } from "draft-js";
import { TextEditor } from "../../components/admin/news/TextEditor";
const EspecialidadForm = () => {
  const router = useRouter();
  const specialtyInfo = router.query;
  const [images, setImages] = useState([]);
  const [skills, setSkills] = useState([]);
  const [background, setBackground] = useState("#ffff");
  const form = useRef();
  const { setLoading } = useContext(AppContext);
  const { userInfo, isLogged } = useContext(UserContext);
  const contentState = useHtmlToDraftBlocks(specialtyInfo?.description);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  
  useEffect(() => {
    if (specialtyInfo.id) {
      setImages(
        specialtyInfo.images ? images.concat(specialtyInfo.images) : []
      );
      setSkills(
        specialtyInfo.recommended_skills
          ? skills.concat(specialtyInfo.recommended_skills)
          : []
      );
      setBackground(specialtyInfo.color);
    } else {
      if (userInfo.role == "EDITOR") router.push("/admin");
    }
  }, [specialtyInfo.id]);

  useEffect(() => {
    if (!isLogged || (!specialtyInfo.id && userInfo.role == "EDITOR")) {
      router.push("/login");
    }
  }, [isLogged, router, userInfo.role, specialtyInfo.id]);

  useEffect(() => {
    if (contentState) {
      console;
      setEditorState(EditorState.createWithContent(contentState));
    }
  }, [contentState]);
  const handleOpenFileInput = () => {
    document.getElementById("image-input").click();
  };

  const handleFileChange = async ({ target }) => {
    const file = target.files[0];
    if (file) {
      setLoading(true);
      const url = await uploadImage(file);
      setLoading(false);
      if (!url) return;
      setImages([...images, url]);
    }
    target.value = null;
  };
  const handlePostSpecialty = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await SpecialtiesService.createSpecialtySpecialtiesPost({
        description: draftjsToHtml(
          convertToRaw(editorState.getCurrentContent())
        ),
        color: background,
        title: form.current["title"].value,
        images: images,
        recommended_skills: skills,
      });
      Swal.fire({
        title: "Éxito!!",
        text: "Especialidad Creada",
        icon: "success",
      });
      router.push("/admin");
    } catch (error) {
      if (error.status == 400 || error.status == 422) {
        Swal.fire({
          title: "Error!!",
          text: "La especialidad debe de tener un titulo y descripción",
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
  const handleUpdateSpecialty = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await SpecialtiesService.updateSpecialitySpecialtiesIdSpecialtyPut(
        specialtyInfo.id,
        {
          description: draftjsToHtml(
            convertToRaw(editorState.getCurrentContent())
          ),
          color: background,
          title: form.current["title"].value,
          images: images,
          recommended_skills: skills,
        }
      );
      Swal.fire({
        title: "Éxito!!",
        text: "Especialidad Actualizada",
        icon: "success",
      });
      router.push("/admin");
    } catch (error) {
      console.log(error);
      if (error.status == 400 || error.status == 422) {
        Swal.fire({
          title: "Error!!",
          text: "La especialidad debe de tener un titulo y descripción",
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
  const handleDeleteImage = (url) => {
    Swal.fire({
      title: "¿Deseas eliminar la imagen?",
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setImages(images.filter((src) => url != src));
      }
    });
  };

  const handleAddSkill = () => {
    setSkills([...skills, form.current["skill"].value]);
    form.current["skill"].value = "";
  };
  const handleDeleteSkill = (skill_param) => {
    setSkills(skills.filter((skill) => skill != skill_param));
  };
  return (
    <div className="container">
      <div className="row">
        <form
          ref={form}
          onSubmit={
            specialtyInfo.id ? handleUpdateSpecialty : handlePostSpecialty
          }
          className="  col-12 col-md-8 offset-md-2 d-flex flex-column justify-content-center align-items-center gap-3 border rounded px-4 py-1 my-3"
        >
          <input
            type="file"
            id="image-input"
            hidden
            name="image"
            accept="image/png, Image/jpeg, Image/jpg"
            onChange={handleFileChange}
          />
          <h1 className="text-center mt-2 ">Formulario de Especialidad</h1>
          <input
            type="text"
            className="form-control fs-2 text-center mt-1"
            placeholder="Titulo"
            name="title"
            defaultValue={specialtyInfo.id ? specialtyInfo.title : ""}
          />
          <label className="text-center fs-4">Descripción</label>
          <TextEditor
            editorState={editorState}
            setEditorState={setEditorState}
          />

          <h4 className="text-center">Habilidades Recomendadas</h4>
          <div className="d-flex justify-items-center gap-1">
            <input
              type="text "
              className="form-control  text-center px-4"
              name="skill"
              placeholder="Habilidad"
            />
            <a className="btn btn-primary" onClick={handleAddSkill}>
              Agregar
            </a>
          </div>
          {skills.length > 0 ? (
            skills.map((skill) => (
              <div
                className="skill-bar rounded d-flex justify-content-between  border w-50 "
                key={skill}
              >
                <span>{skill}</span>
                <span
                  className="skill-bar-btn "
                  onClick={() => handleDeleteSkill(skill)}
                >
                  {" "}
                  x
                </span>
              </div>
            ))
          ) : (
            <h6>Todavía no hay habilidades</h6>
          )}
          <div className="row w-100 mt-5">
            <h4 className="text-center mb-3">Color de la especialidad</h4>
            <div
              className="col-12 col-sm-6"
              style={{ backgroundColor: background }}
            ></div>
            <div className="col-12 col-lg-6 d-flex justify-content-center">
              <ColorPicker
                setBackground={setBackground}
                background={background}
              />
            </div>
          </div>
          <h4 className="text-center mt-3">Imagenes</h4>
          <div className="row w-100 ">
            {images?.length > 0 &&
              images.map((url) => (
                <ImageCustom
                  key={url}
                  src={url}
                  handleDelete={handleDeleteImage}
                />
              ))}
            <div className="col-12 col-sm-5 mt-3 d-flex justify-content-center align-items-center ">
              <div
                className="add-image d-flex justify-content-center align-items-center "
                onClick={handleOpenFileInput}
              >
                +
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between my-4 w-100">
            <button type="submit" className="btn btn-primary">
              {specialtyInfo.id ? "Actualizar" : "Publicar"}
            </button>
            <Link href="/admin/especialidades">
              <a className="btn btn-secondary">Volver</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EspecialidadForm;
