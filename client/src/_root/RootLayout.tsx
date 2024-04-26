import { Navigate, Outlet } from "react-router-dom";
import Navbar from "./pages/Navbar";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const RootLayout = () => {
  const { authenticated } = useContext(AuthContext);

  if (!authenticated) return <Navigate to="/login" replace />;
  return (
    <div className="w-full">
      <Navbar />
      <section className="flex justify-center max-w-5xl">
        <Outlet />
      </section>
    </div>
  );
};
export default RootLayout;
