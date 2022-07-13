import React, { useContext, useEffect, useRef } from "react";
import { SpecialtiesService } from "../../client";
import { SpecialtyRow } from "../../components/admin/specialties/SpecialtyRow";
import { SpecialtyList } from "../../components/admin/specialties/SpecialtyList";
import { AppContext } from "../../components/context/appContext";
import { UserContext } from "../../components/context/userContext";
import { useFetchSpecialties } from "../../hooks/useFetchSpecialties";
import Link from "next/link";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
const Especialidades = () => {
  const { setTitle, specialties, setSpecialties } = useFetchSpecialties();
  const { userInfo, isLogged } = useContext(UserContext);
  const titleForm = useRef(null);
  const { setLoading } = useContext(AppContext);
  const router = useRouter();
  
  useEffect(() => {
    if (!isLogged) {
      router.push("/login");
    }
  }, [isLogged, router]);

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
          await SpecialtiesService.deleteSpecialitySpecialtiesIdSpecialtyDelete(
            id
          );
          Swal.fire("Eliminado", title, "success");
          setSpecialties(specialties.filter((specialty) => id != specialty.id));
        } catch (error) {
          console.log(error);
          Swal.fire("Error al eliminar", title, "error");
        }
        setLoading(false);
      }
    });
  };
  const handleFilterSpecialties = (e) => {
    e.preventDefault();
    setTitle(titleForm.current["title"].value);
  };
  return (
    <div className="container">
      <h1 className="text-center">Administración de Especialidades</h1>
      <div
        className="d-flex flex-column align-items-center justify-content-center"
        onSubmit={handleFilterSpecialties}
      >
        <form className="my-4 w-75" ref={titleForm}>
          <input
            className="form-control"
            type="text"
            placeholder="Titulo"
            name="title"
          />
        </form>
        {specialties.length > 0 ? (
          <SpecialtyList>
            {specialties.map(
              ({
                id,
                title,
                images,
                description,
                color,
                recommended_skills,
              }) => (
                <SpecialtyRow
                  key={id}
                  id={id}
                  title={title}
                  images={images}
                  description={description}
                  color={color}
                  recommended_skills={recommended_skills}
                  handleDelete={handleDelete}
                />
              )
            )}
          </SpecialtyList>
        ) : (
          <h3>Especialidades no encontradas</h3>
        )}
      </div>

      <div className="w-full my-4 d-flex justify-content-center gap-5">
        {userInfo.role != "EDITOR" && (
          <Link href="/admin/especialidad_form" passHref>
            <div className="btn btn-primary">Crear Especialidad</div>
          </Link>
        )}
        <Link href="/admin">
          <a className="btn btn-secondary">Volver</a>
        </Link>
      </div>
    </div>
  );
};

export default Especialidades;
