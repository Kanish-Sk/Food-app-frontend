import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import Logo from "../../Shared/images/Grab.png";
import { userSideBarDetails } from "./UserSideBarDetails";
import { OwnerSideBarDetails } from "./OwnerSideBarDetails";
import "../../Shared/styles/buttonStyle.css";
import { toast } from "react-toastify";
import { UserContext } from "../../Shared/context/UserContext";

const SideBar = () => {
  const { role, setUsername, setIsLogin, setDarkMode, setRole } =
    useContext(UserContext);
  const location = useLocation();
  const [activePath, setActivepath] = useState(location.pathname);
  const navigate = useNavigate();

  const [data, setData] = useState({});

  const handleLoggout = () => {
    setUsername("");
    setIsLogin(false);
    setDarkMode(false);
    setRole("");
    toast.success("Loggout succesfully.");
    navigate("/");
  };

  useEffect(() => {
    if (role === "user") {
      setData(userSideBarDetails);
    } else if (role === "owner") {
      setData(OwnerSideBarDetails);
    }
  }, [role]);

  useEffect(() => {
    setActivepath(location.pathname);
  }, [location.pathname]);

  return (
    <nav
      className="bg-gray-800 p-5 mt-4s md:rounded-3xl w-full md:w-max flex h-full flex-col justify-between"
      style={{ zIndex: 1000 }}
    >
      {/*Logo and Title*/}
      <div>
        <div className="mb-10">
          <div className="flex items-center">
            <img
              className="w-16 md:w-12 rounded-lg mr-4 md:mr-0"
              src={Logo}
              alt="Logo"
            />
            <h1 className="block md:hidden uppercase text-white font-bold text-lg">
              Grab And Go
            </h1>
          </div>
        </div>

        {/* Icons like home etc */}
        <div className="flex flex-col items-start md:items-center space-y-5 flex-grow z-10">
          {Object.entries(data).map(([key, value]) => (
            <li
              key={key}
              className="relative flex items-center w-full md:w-auto"
            >
              <Link
                to={value.path}
                onClick={() => setActivepath(value.path)}
                className={`group flex items-center ${
                  activePath === value.path
                    ? "bg-green-600 w-full md:w-11 h-10 p-5 md:h-10 rounded md:rounded-full flex justify-center items-center"
                    : "w-full md:w-11 h-11 md:h-11 rounded-full flex justify-center items-center"
                }`}
              >
                <div className="flex items-center z-[1000px]">
                  {value.svg}
                  <span className="text-white text-sm font-medium ml-2 md:absolute cursor-pointer md:cursor-auto md:top-1/2 md:left-full md:transform md:-translate-y-1/2 md:ml-5 md:transition-all md:duration-200 md:ease-in-out md:opacity-0 md:group-hover:opacity-100 md:bg-gray-500 md:rounded-lg md:p-2 md:text-xs">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </div>
      </div>

      {/* Logout */}
      <div className="flex text-black items-center justify-center w-full mb-20 md:mb-0 md:w-auto mt-10 md:mt-auto">
        <div onClick={handleLoggout} className="cursor-pointer">
          <div className="badge btninner border-2 bg-black md:before:bg-green-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="icon"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
              />
            </svg>
            <p className="block md:hidden">Logout</p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SideBar;
