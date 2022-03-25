import React, { useContext, useEffect, useRef } from "react";
import { UsersService } from "../client";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { UserContext } from "../components/context/userContext";

const Login = () => {
  const { logIn, isLogged } = useContext(UserContext);
  const form = useRef(null);
  const router = useRouter();
  useEffect(() => {
    if (isLogged) {
      router.push("/admin");
    }
  }, [isLogged, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await UsersService.loginUserUsersLoginPost({
        email: form.current["email"].value,
        password: form.current["password"].value,
      });
      logIn(response.jwt);
      router.push("/admin");
    } catch (error) {
      Swal.fire({
        title: "Error!!",
        text: "Email o contraseña incorrectos",
        icon: "error",
      });
    }
  };

  return (
    <div className="container">
      <div className="row">
        <form
          onSubmit={handleLogin}
          ref={form}
          className="col col-sm-8 col-md-6 col-lg-4 offset-sm-2 offset-md-3 offset-lg-4  d-flex flex-column gap-3 shadow border rounded py-4 px-5  mt-5"
        >
          <h1 className="text-center">Iniciar Sesión</h1>
          <input
            type="email"
            className="form-control text-center"
            name="email"
            placeholder="Email"
          />
          <input
            type="password"
            className="form-control text-center"
            name="password"
            placeholder="Contraseña"
          />
          <button type="submit" className="btn-primary py-1">
            Iniciar Sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
