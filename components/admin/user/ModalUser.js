import React, { useEffect, useRef, useState } from "react";
import reactDom from "react-dom";
import { ModalContainer } from "/components/general/ModalContainer";
import { UsersService } from "../../../client";
import Swal from "sweetalert2";
export const ModalUser = ({ show, onClose, handleGetUsers, userInfo }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  const form = useRef(null);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();

    try {
      await UsersService.createUserUsersPost({
        email: form.current["email"].value,
        full_name: form.current["name"].value,
        password: form.current["password"].value,
        role: form.current["role"].value,
      });
      Swal.fire({
        title: "Éxito!!",
        text: "Usuario creado con éxito",
        icon: "success",
      });
      onClose();
      handleGetUsers();
    } catch (error) {
      if (error.status == 400) {
        Swal.fire({
          title: "Error!!",
          text: "La contraseña tiene que tener al menos una mayúscula y un número.",
          icon: "error",
        });
      } else if (error.status == 409) {
        Swal.fire({
          title: "Error!!",
          text: "Ya existe un usuario registrado con este correo.",
          icon: "error",
        });
        Swal.fire({
          title: "Error!!",
          text: "Ya existe un usuario registrado con este correo.",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Error!!",
          text: "Error desconocido, contacte con el administrador",
          icon: "error",
        });
      }
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    try {
      await UsersService.updateUserUsersUserIdPut(userInfo.id, {
        email: form.current["email"].value,
        full_name: form.current["name"].value,
        role: form.current["role"].value,
      });
      Swal.fire({
        title: "Éxito!!",
        text: "Usuario actualizado con éxito",
        icon: "success",
      });
      onClose();
      handleGetUsers();
    } catch (error) {
      if (error.status == 400) {
        Swal.fire({
          title: "Error!!",
          text: "La contraseña tiene que tener al menos una mayúscula, un número y mínimo 8 carácteres.",
          icon: "error",
        });
      } else if (error.status == 409) {
        Swal.fire({
          title: "Error!!",
          text: "Ya existe un usuario registrado con este correo.",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "Error!!",
          text: "Error desconocido, contacte con el administrador",
          icon: "error",
        });
      }
    }
  };

  const modalContent = show && (
    <ModalContainer>
      <form
        ref={form}
        className=" d-flex flex-column aling-items-center text-center gap-3"
        onSubmit={!userInfo ? handleCreateUser : handleUpdateUser}
      >
        <input
          className="form-control"
          type="text"
          placeholder="Nombre"
          name="name"
          defaultValue={userInfo?.full_name ? userInfo.full_name : ""}
          required
        />
        <input
          className="form-control"
          type="email"
          placeholder="Correo "
          name="email"
          defaultValue={userInfo?.email ? userInfo.email : ""}
          required
        />
        {!userInfo && (
          <input
            className="form-control"
            type="password"
            placeholder="Contraseña"
            name="password"
            required
          />
        )}

        <select
          name="role"
          className="form-select"
          defaultValue={userInfo?.role ? userInfo.role : "EDITOR"}
        >
          <option value="EDITOR">Editor</option>
          <option value="ADMIN">Admin</option>
        </select>
        <div className="d-flex gap-5">
          <button type="submit" className="btn btn-primary ">
            {userInfo ? "Actualizar Usuario" : "Crear Usuario"}
          </button>
          <button className="btn btn-secondary" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </form>
    </ModalContainer>
  );

  if (isBrowser) {
    return reactDom.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};
