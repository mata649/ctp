import React, { useContext, useRef } from "react";
import { useFetchWorkshops } from "../../hooks/useFetchWorkshops";
import Link from "next/link";
import { UserContext } from "../../components/context/userContext";
import { WorkshopList } from "../../components/admin/workshop/WorkshopList";
import { WorkshopRow } from "../../components/admin/workshop/WorkshopRow";
import { WorkshopsService } from "../../client";
import Swal from "sweetalert2";
import { AppContext } from "../../components/context/appContext";
const Talleres = () => {
  const { setTitle, workshops, setWorkshops } = useFetchWorkshops();
  const { userInfo } = useContext(UserContext);
  const titleForm = useRef(null);
  const { setLoading } = useContext(AppContext);
  const handleDelete = (id, title) => {
    Swal.fire({
      title: "¿Deseas eliminar a " + title + "?",
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          await WorkshopsService.deleteWorkshopWorkshopsIdWorkshopDelete(id);
          Swal.fire("Eliminado", title, "success");
          setWorkshops(workshops.filter((workshop) => id != workshop.id));
        } catch (error) {
          console.log(error);
          Swal.fire("Error al eliminar", title, "error");
        }
        setLoading(false);
      }
    });
  };
  const handleFilterWorkshops = (e) => {
    e.preventDefault();
    setTitle(titleForm.current["title"].value);
  };
  return (
    <div className="container">
      <h1 className="text-center">Administración de Talleres</h1>
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        onSubmit={handleFilterWorkshops}
      >
        <form className="my-4 w-75" ref={titleForm}>
          <input
            className="form-control"
            type="text"
            placeholder="Titulo"
            name="title"
          />
        </form>
        {workshops.length > 0 ? (
          <WorkshopList>
            {workshops.map(({ id, title, images, description, color }) => (
              <WorkshopRow
                key={id}
                id={id}
                title={title}
                images={images}
                description={description}
                color={color}
                handleDelete={handleDelete}
              />
            ))}
          </WorkshopList>
        ) : (
          <h3>Talleres no encontrados</h3>
        )}
      </div>

      <div className="w-full my-4 d-flex justify-content-center gap-5">
        {userInfo.role != "EDITOR" && (
          <Link href="/admin/taller_form" passHref>
            <div className="btn btn-primary">Crear Taller</div>
          </Link>
        )}
        <Link href="/admin">
          <a className="btn btn-secondary">Volver</a>
        </Link>
      </div>
    </div>
  );
};

export default Talleres;
