import { OpenAPI } from "../client";

export const setHeaderToken = () => {
    OpenAPI.HEADERS = {
        Authorization : "Bearer "+ localStorage.getItem("jwt")
    }
};
