import React, { useContext, useEffect } from "react";
import { useRouter } from "next/dist/client/router";
import { UserContext } from "../../components/context/userContext";
import { faDesktop, faUsers } from "@fortawesome/free-solid-svg-icons";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import { faHammer } from "@fortawesome/free-solid-svg-icons";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { ModuleButton } from "../../components/admin/ModuleButton";
const Index = () => {
  const router = useRouter();

  const { isLogged, userInfo } = useContext(UserContext);

  useEffect(() => {
    if (!isLogged) {
      router.push("/login");
    }
  }, [isLogged, router]);

  return (
    <div className="container">
      <h1 className="mt-4">Bienvenido: {userInfo.full_name}</h1>
      <div className="row">
        {userInfo.role != "EDITOR" && (
          <ModuleButton
            title="Usuarios"
            href="/admin/usuarios"
            icon={faUsers}
          />
        )}
        {userInfo.role != "EDITOR" && (
          <ModuleButton
            title="Noticias"
            href="/admin/noticias"
            icon={faNewspaper}
          />
        )}
        {userInfo.role != "EDITOR" && (
          <ModuleButton
            title="General"
            href="/admin/informacion_general"
            icon={faCircleInfo}
          />
        )}
        <ModuleButton title="Talleres" href="/admin/talleres" icon={faHammer} />
        <ModuleButton
          title="Especialidades"
          href="/admin/especialidades"
          icon={faDesktop}
        />
      </div>
    </div>
  );
};

export default Index;
