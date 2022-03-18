import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useEffect } from "react";
import { TableIcon } from "../TableIcon";
import moment from "moment";
export const NewsRow = ({ title, id, text, published, handleDelete }) => {
  useEffect(() => {
    moment.locale("es");
  }, []);

  return (
    <tr>
      <th>{title}</th>
      <td>{moment(published).format("Do MMMM YYYY")}</td>
      <td className="d-flex gap-3">
        <TableIcon
          icon={faTrash}
          title="Eliminar"
          onClick={() => handleDelete(id, title)}
        />
        <TableIcon
          icon={faPen}
          title="Actualizar"
          onClick={() => setShowUpdateUserModal(true)}
        />
      </td>
    </tr>
  );
};