import { useEffect, useContext } from "react";
import { themeChange } from "theme-change";
import { FaPlus } from "react-icons/fa6";
import { GrLogout } from "react-icons/gr";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const { username } = user;
  useEffect(() => {
    themeChange(false);
  }, []);

  const handleLogout = () => {
    console.log("Logout Clicked");
    setUser({ id: null, username: null, email: null, token: null });
    setAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1 gap-2">
        <a className="btn btn-ghost text-sm md:text-xl">TruTask</a>
        <div className="flex flex-col sm:flex-row gap-1 items-center">
          <img
            src="/assets/icons/profile-placeholder.svg"
            alt="img"
            className="w-8 h-8 border-neutral rounded-full object-cover"
          />
          <p className="text-sm flex text-secondary">{username}</p>
        </div>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <FaPlus className="w-12 h-12 text-green-700 cursor-pointer" />
          </li>
          <li onClick={handleLogout}>
            <GrLogout className="w-12 h-12 text-red-700 font-semibold cursor-pointer" />
          </li>
          <li>
            <select
              data-choose-theme
              defaultValue="light"
              className="select select-primary w-full max-w-xs text-sm md:text-normal"
            >
              <option className="text-sm md:text-normal" value="light">
                Light
              </option>
              <option className="text-sm md:text-normal" value="dark">
                Dark
              </option>
              <option className="text-sm md:text-normal" value="retro">
                Retro
              </option>
              <option className="text-sm md:text-normal" value="night">
                Night
              </option>
              <option className="text-sm md:text-normal" value="lemonade">
                Lemonade
              </option>
            </select>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Navbar;
