import { useCallback, useContext, useEffect, useState } from "react";
import { OpenAPI, UsersService } from "../client";
import { AppContext } from "../components/context/appContext";
import { setHeaderToken } from "../helpers/setHeaderToken";

export const useUserInfo = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [jwt, setJwt] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const {setLoading} = useContext(AppContext)
  
  const handleGetUserInfo = useCallback(async () => {
    setLoading(true);
    try {
      setHeaderToken();
      const response =
        await UsersService.getUserLoggedInfoUsersUserLoggedInfoGet();
      setUserInfo({ ...response });
    } catch (err) {
      logOut();
    }
    setLoading(false);
  }, [setLoading]);

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
