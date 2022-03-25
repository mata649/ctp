import React, { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { ColorPicker } from "../../components/general/ColorPicker";
import { uploadImage } from "../../helpers/uploadImage";
import { AppContext } from "../../components/context/appContext";
import { WorkshopsService } from "../../client";
import Swal from "sweetalert2";
import { ImageCustom } from "../../components/general/ImageCustom";
import { UserContext } from "../../components/context/userContext";

const TallerForm = () => {
  const router = useRouter();
  const workshopInfo = router.query;

  const [images, setImages] = useState([]);
  const [background, setBackground] = useState("#ffff");
  const form = useRef();
  const { setLoading } = useContext(AppContext);
  const { userInfo } = useContext(UserContext);
  useEffect(() => {
    if (workshopInfo.id) {
      setImages(workshopInfo.images ? images.concat(workshopInfo.images) : []);
      setBackground(workshopInfo.color);
    } else {
      if (userInfo.role == "EDITOR") router.push("/admin");
    }
  }, [workshopInfo.color, workshopInfo.id, workshopInfo.images]);

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
  const handlePostWorkshop = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await WorkshopsService.createWorkshopWorkshopsPost({
        description: form.current["description"].value,
        color: background,
        title: form.current["title"].value,
        images: images,
      });
      Swal.fire({
        title: "Éxito!!",
        text: "Taller Creado",
        icon: "success",
      });
      router.push("/admin");
    } catch (error) {
      if (error.status == 400 || error.status == 422) {
        Swal.fire({
          title: "Error!!",
          text: "El taller debe de tener un titulo y descripción",
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
  const handleUpdateWorkshop = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await WorkshopsService.updateWorkshopWorkshopsIdWorkshopPut(
        workshopInfo.id,
        {
          description: form.current["description"].value,
          color: background,
          title: form.current["title"].value,
          images: images,
        }
      );
      Swal.fire({
        title: "Éxito!!",
        text: "Taller Actualizado",
        icon: "success",
      });
      router.push("/admin");
    } catch (error) {
      if (error.status == 400 || error.status == 422) {
        Swal.fire({
          title: "Error!!",
          text: "El taller debe de tener un titulo y descripción",
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
  return (
    <div className="container">
      <div className="row">
        <form
          ref={form}
          onSubmit={workshopInfo.id ? handleUpdateWorkshop : handlePostWorkshop}
          className="col-12 col-md-8 offset-md-2 d-flex flex-column justify-content-center align-items-center gap-3 border rounded px-4 py-1 my-3"
        >
          <input
            type="file"
            id="image-input"
            hidden
            name="image"
            accept="image/png, Image/jpeg, Image/jpg"
            onChange={handleFileChange}
          />
          <h1 className="text-center mt-2">Formulario de Taller</h1>
          <input
            type="text"
            className="form-control fs-2 text-center mt-1"
            placeholder="Titulo"
            name="title"
            defaultValue={workshopInfo.id ? workshopInfo.title : ""}
          />
          <label className="text-center fs-4">Descripción</label>
          <textarea
            type="text"
            className="form-control  mt-1"
            name="description"
            style={{ height: "400px" }}
            defaultValue={workshopInfo.id ? workshopInfo.description : ""}
          />

          <div className="row w-100">
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
          <h4 className="text-center">Imagenes</h4>

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
              {workshopInfo.id ? "Actualizar" : "Publicar"}
            </button>
            <Link href="/admin/talleres">
              <a className="btn btn-secondary">Volver</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TallerForm;
