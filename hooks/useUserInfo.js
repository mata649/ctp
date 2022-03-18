import { useCallback, useEffect, useState } from "react";
import { OpenAPI, UsersService } from "../client";
import { setHeaderToken } from "../helpers/setHeaderToken";

export const useUserInfo = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [jwt, setJwt] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const handleGetUserInfo = useCallback(async () => {
    try {
      setHeaderToken();
      const response =
        await UsersService.getUserLoggedInfoUsersUserLoggedInfoGet();
      setUserInfo({ ...response });
    } catch (err) {
      logOut();
    }
  }, []);

  useEffect(() => {
    setJwt(localStorage.getItem("jwt"));

    if (jwt) {
      handleGetUserInfo();
      setIsLogged(true);
    } else {
      OpenAPI.HEADERS = {};
      setIsLogged(false);
    }
  }, [handleGetUserInfo, jwt]);

  const logOut = () => {
    setJwt("");
    localStorage.removeItem("jwt");
  };
  const logIn = (jwt) => {
    setJwt(jwt);
    localStorage.setItem("jwt", jwt);
  };

  return {
    jwt,
    isLogged,
    logIn,
    logOut,
    userInfo,
  };
};
