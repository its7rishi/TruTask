import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const AuthLayout = () => {
  const { authenticated } = useContext(AuthContext);

  return (
    <>
      {authenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <Outlet />
        </>
      )}
    </>
  );
};
export default AuthLayout;
