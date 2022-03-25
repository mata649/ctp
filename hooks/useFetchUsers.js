import { useCallback, useContext, useEffect, useState } from "react";

import {  UsersService } from "../client";
import { AppContext } from "../components/context/appContext";
export const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const {setLoading} = useContext(AppContext)
  const handleGetUsers = useCallback(async () => {
    setLoading(true)
    try {
      if (email.length > 0) {
        const response = await UsersService.getUsersUsersGet(email);
        setUsers([response]);
      } else {
        const response = await UsersService.getUsersUsersGet();
        setUsers(response);
      }
    } catch (error) {
      setUsers([])
    }
    setLoading(false)
  }, [email, setLoading]);

  useEffect(() => {
    handleGetUsers();
  }, [handleGetUsers, email]);
  return {
    setEmail,
    users,
    setUsers,
    handleGetUsers,
  };
};
