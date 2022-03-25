import React from "react";
import { SketchPicker } from "react-color";

export const ColorPicker = ({ setBackground, background }) => {
  const handleChangeColor = (color) => {
    setBackground(color.hex);
  };
  return <SketchPicker color={background} onChange={handleChangeColor} />;
};
