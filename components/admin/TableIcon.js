import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export const TableIcon = ({ title, icon, onClick }) => {
  return (
    <span
      className="table-icon"
      data-bs-toggle="tooltip"
      data-bs-placement="top"
      title={title}
      onClick={onClick}
    >
      <FontAwesomeIcon className="table-icon" icon={icon} />
    </span>
  );
};
