import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { UserList } from "../../components/admin/user/UserList";
import { UserContext } from "../../components/context/userContext";
import { useFetchUsers } from "../../hooks/useFetchUsers";
import Swal from "sweetalert2";
import { UsersService } from "../../client";
import { ModalUser } from "../../components/admin/user/ModalUser";
import Link from "next/link";
import { UserRow } from "../../components/admin/user/UserRow";
import { useIsAdmin } from "../../hooks/useIsAdmin";
import { AppContext } from "../../components/context/appContext";

const Usuarios = () => {
  const { setEmail, users, setUsers, handleGetUsers } = useFetchUsers();
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const emailForm = useRef(null);
  const { setLoading } = useContext(AppContext);
  useIsAdmin();

  const handleDelete = (id, full_name) => {
    Swal.fire({
      title: "¿Deseas eliminar a " + full_name + "?",
      showDenyButton: true,
      confirmButtonText: "Si",
      denyButtonText: `Cancelar`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          setLoading(true)
          await UsersService.deleteUserUsersUserIdDelete(id);
          setLoading(false)
          Swal.fire("Eliminado", full_name, "success");
          setUsers(users.filter((user) => id != user.id));
        } catch (error) {
          Swal.fire("Error al eliminar", full_name, "error");
        }
      }
    });
  };
  const handleFilterUsers = (e) => {
    e.preventDefault();
    setEmail(emailForm.current["email"].value);
  };
  return (
    <div className="container ">
      <h1 className="text-center mt-2">Administración de Usuarios</h1>
      <form className="my-4" ref={emailForm} onSubmit={handleFilterUsers}>
        <input
          className="form-control"
          type="text"
          name="email"
          placeholder="Correo"
        />
      </form>
      {users.length > 0 ? (
        <UserList>
          {users.map(({ full_name, id, role, email }) => (
            <UserRow
              key={id}
              full_name={full_name}
              role={role}
              email={email}
              id={id}
              handleGetUsers={handleGetUsers}
              handleDelete={handleDelete}
            />
          ))}
        </UserList>
      ) : (
        <h4 className="text-center mt-5">Usuario no encontrado</h4>
      )}
      <div className="d-flex w-full gap-2 justify-content-center my-4">
        <ModalUser
          onClose={() => setShowCreateUserModal(false)}
          show={showCreateUserModal}
          handleGetUsers={handleGetUsers}
        />
        <button
          className="btn btn-primary"
          onClick={() => setShowCreateUserModal(true)}
        >
          Crear Usuario
        </button>

        <Link href="/admin">
          <a className="btn btn-secondary">Volver</a>
        </Link>
      </div>
    </div>
  );
};

export default Usuarios;
