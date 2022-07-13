import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useContext, useEffect } from "react";
import { TableIcon } from "../TableIcon";
import { useRouter } from "next/router";
import { UserContext } from "../../context/userContext";

export const SpecialtyRow = ({
  id,
  title,
  images,
  description,
  color,
  recommended_skills,
  handleDelete,
}) => {
  const router = useRouter();
  const { userInfo } = useContext(UserContext);
  const handleRedirectToSpecialtyForm = () => {
    router.push({
      pathname: "/admin/especialidad_form",
      query: {
        id,
        description,
        title,
        images,
        color,
        recommended_skills
      },
    });
  };
  return (
    <tr>
      <th>{title}</th>
      <td>
        <div
          style={{ backgroundColor: color, width: "20px", height: "20px" }}
        ></div>
      </td>
      <td className="d-flex gap-3">
        {userInfo.role != "EDITOR" && (
          <TableIcon
            icon={faTrash}
            title="Eliminar"
            onClick={() => handleDelete(id, title)}
          />
        )}
        <TableIcon
          icon={faPen}
          title="Actualizar"
          onClick={handleRedirectToSpecialtyForm}
        />
      </td>
    </tr>
  );
};
