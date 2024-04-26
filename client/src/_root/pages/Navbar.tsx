import { useEffect, useContext } from "react";
import { themeChange } from "theme-change";
import { FaPlus } from "react-icons/fa6";
import { GrLogout } from "react-icons/gr";
import { AuthContext } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const { setAuthenticated } = useContext(AuthContext);

  const navigate = useNavigate();

  const { username } = user;
  useEffect(() => {
    themeChange(false);
  }, []);

  const handleLogout = () => {
    setUser({ id: null, username: null, email: null, token: null });
    setAuthenticated(false);
    navigate("/login");
  };

  const handleClick = () => {
    navigate("/create-task");
  };

  return (
    <div className="navbar bg-base-100 border-b border-secondary">
      <div className="flex-1 gap-2">
        <Link to="/" className="btn btn-ghost text-sm md:text-xl">
          TruTask
        </Link>
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
            <span>
              <FaPlus
                className="w-4 h-4 md:w-5 md:h-5 text-green-700 cursor-pointer"
                onClick={handleClick}
              />
            </span>
          </li>
          <li onClick={handleLogout}>
            <span>
              <GrLogout className="w-4 h-4 md:w-5 md:h-5 text-red-700" />
            </span>
          </li>
          <li>
            <select
              data-choose-theme
              defaultValue="light"
              className="select-primary w-24 md:w-full max-w-xs text-xs md:text-normal tracking-tighter md:tracking-normal"
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
