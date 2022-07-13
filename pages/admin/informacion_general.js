import React, { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { UserContext } from "../../components/context/userContext";
import { ImageCustom } from "../../components/general/ImageCustom";
import { AppContext } from "../../components/context/appContext";
import { uploadImage } from "../../helpers/uploadImage";
import Swal from "sweetalert2";
import { GeneralInformationService } from "../../client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { useIsAdmin } from "../../hooks/useIsAdmin";
const InformacionGeneral = () => {
  const { generalInformation, handleGetGeneralInformation } =
    useContext(UserContext);
  const [administrators, setAdministrators] = useState([]);
  const [images, setImages] = useState([]);
  const form = useRef(null);
  const { setLoading } = useContext(AppContext);
  const [active, setActive] = useState(true);
  const router = useRouter();
  useIsAdmin()
  useEffect(() => {
    setAdministrators(
      generalInformation?.administrators
        ? administrators.concat(generalInformation?.administrators)
        : []
    );
   
    setImages(
      generalInformation?.carousel_images
        ? images.concat(generalInformation?.carousel_images)
        : []
    );
  }, [generalInformation]);

  const handleDeleteAdministrator = (name_ad, position_ad) => {
    setAdministrators(
      administrators.filter(
        ({ name, position }) => name_ad != name && position != position_ad
      )
    );
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
  const handleOpenFileInput = () => {
    document.getElementById("image-input").click();
  };
  const handleAddAdministrator = (e) => {
    e.preventDefault();
    setAdministrators([
      ...administrators,
      {
        name: form.current["administrator_name"].value,
        position: form.current["administrator_position"].value,
      },
    ]);
    form.current["administrator_name"].value = "";
    form.current["administrator_position"].value = "";
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
  const handleUpdateGeneralInformation = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      await GeneralInformationService.updateGeneralInformationGeneralInformationPut(
        {
          address: form.current["address"].value,
          schedule_link: form.current["schedule_link"].value,
          administrators: administrators,
          carousel_images: images,
          telephone: form.current["telephone"].value,
          email: form.current["email"].value,
          teachers_link: form.current["teachers_link"].value,
          admission_requirements: generalInformation.admission_requirements,
          scholarship_requirements: generalInformation.scholarship_requirements,
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
      <div className="d-flex gap-4 justify-content-center">
        <Link href={"/admin/requisitos_admision"}>
          <a className="btn btn-success">Admisión</a>
        </Link>
        <Link href={"/admin/requisitos_beca"}>
          <a className="btn btn-success">Beca</a>
        </Link>
      </div>
      <div className="row">
        <form
          ref={form}
          className="col-12 col-sm-8 offset-2 col-md-6 offset-3 border mt-3 d-flex flex-column justify-content-center  gap-3 p-4"
          onSubmit={handleUpdateGeneralInformation}
        >
          <input
            type="file"
            id="image-input"
            hidden
            name="image"
            accept="image/png, Image/jpeg, Image/jpg"
            onChange={handleFileChange}
          />
          <div className="d-flex justify-content-center align-items-center gap-1">
            <h4 className="text-center">Información General</h4>
            <span
              style={{ cursor: "pointer" }}
              onClick={() => setActive(!active)}
            >
              <FontAwesomeIcon icon={faLock} />
            </span>
          </div>
          <input
            name="address"
            type="text"
            className="form-control"
            placeholder="Dirección"
            defaultValue={generalInformation?.address}
            disabled={active}
          />
          <div className="d-flex gap-2">
            <input
              name="telephone"
              type="tel"
              className="form-control w-25"
              placeholder="Teléfono"
              defaultValue={generalInformation?.telephone}
              disabled={active}
            />
            <input
              name="email"
              type="email"
              className="form-control w-75"
              placeholder="Correo"
              defaultValue={generalInformation?.email}
              disabled={active}
            />
          </div>
          <h4 className="text-center">Horarios y Docentes</h4>
          <input
            name="teachers_link"
            type="text"
            className="form-control"
            placeholder="Link Docentes"
            defaultValue={generalInformation?.teachers_link}
            disabled={active}
          />
          <input
            name="schedule_link"
            type="text"
            className="form-control"
            placeholder="Link Horarios"
            defaultValue={generalInformation?.schedule_link}
            disabled={active}
          />

          <h4 className="text-center">Administradores</h4>
          <div className="d-flex gap-3">
            <input
              type="text"
              className="form-control w-50"
              name="administrator_position"
              placeholder="Puesto"
              disabled={active}
            />
            <input
              type="text"
              className="form-control w-50"
              name="administrator_name"
              placeholder="Nombre"
              disabled={active}
            />
            <button
              className="btn btn-primary"
              onClick={handleAddAdministrator}
              disabled={active}
            >
              Agregar
            </button>
          </div>
          {administrators.length > 0 ? (
            administrators.map(({ name, position }) => (
              <div
                key={name}
                className="border p-2 d-flex justify-content-between"
              >
                <span>
                  {position}: {name}
                </span>
                {!active && (
                  <span
                    className="skill-bar-btn "
                    onClick={() => handleDeleteAdministrator(name, position)}
                  >
                    x
                  </span>
                )}
              </div>
            ))
          ) : (
            <h5 className="text-center"> No hay administradores todavía</h5>
          )}

          <h4 className="text-center">Imagenes de Inicio</h4>
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
            <button type="submit" className="btn btn-primary" disabled={active}>
              Actualizar
            </button>
            <Link href="/admin">
              <a className="btn btn-secondary">Volver</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InformacionGeneral;
