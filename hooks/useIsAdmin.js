import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../components/context/userContext";

export const useIsAdmin = () => {
  const { isLogged, userInfo } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!isLogged || userInfo.role == "EDITOR") {
      router.push("/login");
    }
  }, [isLogged, router, userInfo.role]);
};
