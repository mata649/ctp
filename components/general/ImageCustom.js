import React, { useState } from "react";

export const ImageCustom = ({ handleDelete, src }) => {
  const handleShowOptions = () => {
    document.getElementById("delete-" + src).removeAttribute("hidden");
  };
  const handleRemoveOptions = () => {
    document.getElementById("delete-" + src).setAttribute("hidden", true);
  };
  return (
    <div className="col-12 col-lg-6 mt-3 d-flex justify-content-center position-relative">
      <img
        className="workshop-image "
        src={src}
        alt="workshop-image"
        onMouseEnter={handleShowOptions}
        onMouseOut={handleRemoveOptions}
      />

      <span
        className=" delete-button"
        id={"delete-" + src}
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        title="Eliminar"
        onMouseEnter={handleShowOptions}
        onMouseOut={handleRemoveOptions}
        hidden
        onClick={()=>handleDelete(src)}
      >
        x
      </span>
    </div>
  );
};
