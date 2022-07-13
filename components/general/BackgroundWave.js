import React from "react";

export const BackgroundWave = ({ top, bottom, bgColor, children }) => {
  return (
    <div>
      <div style={{ backgroundColor: "white" }}>
        {top}
      </div>
      <div className="py-2 px-5" style={{ backgroundColor: bgColor }}>
        {children}
      </div>
      <div style={{ backgroundColor: bgColor }}>
        {bottom}
      </div>
    </div>
  );
};
