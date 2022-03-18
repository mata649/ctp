import { useCallback, useEffect, useState } from "react";

import {  UsersService } from "../client";
export const useFetchUsers = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const handleGetUsers = useCallback(async () => {
    try {
      if (email.length > 0) {
        const response = await UsersService.getUsersUsersGet(email);
        setUsers([response]);
      } else {
        const response = await UsersService.getUsersUsersGet();
        setUsers(response);
      }
    } catch (error) {
      console.log(error);
    }
  }, [email]);

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
