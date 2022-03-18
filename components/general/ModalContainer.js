import React from "react";

export const ModalContainer = ({ children }) => {
  return (
    <div className="modalOverlay">
      <div className="modalMain d-flex justify-content-center align-items-center">
        <div className="modalBody">{children}</div>
      </div>
    </div>
  );
};
