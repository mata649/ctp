import React, { useState } from "react";
import { TableIcon } from "../TableIcon";
import { faPassport, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { ModalUser } from "./ModalUser";
import { ChangePasswordModal } from "./ChangePasswordModal";
export const UserRow = ({
  full_name,
  email,
  id,
  role,
  handleGetUsers,
  handleDelete,
}) => {
  const [showUpdateUserModal, setShowUpdateUserModal] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  return (
    <tr>
      <ModalUser
        onClose={() => setShowUpdateUserModal(false)}
        show={showUpdateUserModal}
        handleGetUsers={handleGetUsers}
        userInfo={{ full_name, email, id, role }}
      />
      <th>{full_name}</th>
      <td>{email}</td>
      <td>{role}</td>
      <td className="d-flex gap-3">
        <TableIcon
          icon={faTrash}
          title="Eliminar"
          onClick={() => handleDelete(id, full_name)}
        />
        <TableIcon
          icon={faPen}
          title="Actualizar"
          onClick={() => setShowUpdateUserModal(true)}
        />
        <ChangePasswordModal
          show={showChangePasswordModal}
          userId={id}
          userName={full_name}
          onClose={() => setShowChangePasswordModal(false)}
        />
        <TableIcon
          icon={faPassport}
          title="Cambiar Contraseña"
          onClick={() => setShowChangePasswordModal(true)}
        />
      </td>
    </tr>
  );
};
