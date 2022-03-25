import React from "react";

export const WorkshopList = ({children}) => {
  return (
    <table className="table table-hover w-75">
      <thead>
        <tr>
          <th scope="col">Titulo</th>
          <th scope="col">Color</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};
