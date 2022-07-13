import { createContext } from "react";
import { useFetchGeneralInformation } from "../../hooks/useFetchGeneralInformation";
import { useUserInfo } from "../../hooks/useUserInfo";

export const UserContext = createContext();



export const UserProvider = ({ children }) => {
  const userInfo = useUserInfo();

  const generalInformation = useFetchGeneralInformation()
  
  return (
    <UserContext.Provider value={{ ...userInfo, ...generalInformation }}>
      {children}
    </UserContext.Provider>
  );
};
