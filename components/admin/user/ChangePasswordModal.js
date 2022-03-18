import React, { useState, useRef, useEffect } from "react";
import reactDom from "react-dom";
import Swal from "sweetalert2";
import { UsersService } from "../../../client";
import { ModalContainer } from "../../general/ModalContainer";

export const ChangePasswordModal = ({ show, onClose, userId, userName }) => {
  const [isBrowser, setIsBrowser] = useState(false);

  const form = useRef(null);
  useEffect(() => {
    setIsBrowser(true);
  }, []);
  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      await UsersService.changePasswordUserUsersChangePasswordUserIdPut(
        userId,
        { password: form.current["password"].value }
      );
      Swal.fire({
        title: "Éxito!!",
        text: "Contraseña actualizada.",
        icon: "success",
      });
      onClose();
    } catch (error) {
      if (error.status == 400) {
        Swal.fire({
          title: "Error!!",
          text: "La contraseña tiene que tener al menos una mayúscula, un número y mínimo 8 carácteres.",
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
        onSubmit={handleChangePassword}
      >
        <h3>{userName}</h3>
        <input
          className="form-control"
          type="text"
          placeholder="Nueva Contraseña"
          name="password"
          required
        />
        <div className="d-flex gap-5">
          <button type="submit" className="btn btn-primary ">
            Actualizar Contraseña
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
