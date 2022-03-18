import { createContext } from "react";
import { useUserInfo } from "../../hooks/useUserInfo";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const userInfo = useUserInfo();
  return (
    <UserContext.Provider value={{ ...userInfo }}>
      {children}
    </UserContext.Provider>
  );
};
