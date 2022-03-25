import axios from "axios";
import Swal from "sweetalert2";
import { OpenAPI } from "../client";

export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("my_file", file);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
        "Authorization": "Bearer " + localStorage.getItem("jwt")
      },
    };
    const response = await axios.post(OpenAPI.BASE+"/image/", formData, config);
    if (response.status != 200) throw new Error("Error uploading image")
    return response.data.image_url
  } catch (error) {
    console.log(error);
    Swal.fire({
      title: "Error!!",
      text: "Error al subir image",
      icon: "error",
    });
  }
};
