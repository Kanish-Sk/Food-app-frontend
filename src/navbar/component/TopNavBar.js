import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { menu, location, moon, sun } from "../../utility/svg/icons";
import SearchBar from "./SearchBar";

const Navbar = ({ toggleDrawerHandler, toggleDarkMode, darkMode }) => {
  const [, setTheme] = useState("light");
  const locationPath = useLocation().pathname;

  useEffect(() => {
    setTheme(darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleTheme = () => {
    toggleDarkMode();
  };

  return (
    <div
      className="p-4 bg-gray-800 flex items-center 
      } rounded-2xl w-full"
    >
      <div
        className="flex justify-center text-white items-center"
        onClick={toggleDrawerHandler}
      >
        {menu}
      </div>
      <div className="hidden md:block text-white ml-2 justify-center uppercase text-2xl font-bold">
        <div>Grab And Go</div>
      </div>
      <div className="flex justify-end items-center gap-5 grow">
        <div className="border-white bg-white rounded-md p-2">
          <SearchBar />
        </div>
        {locationPath === "/" && (
          <div className="border-white bg-white rounded-md p-2 hover:shadow-md hover:shadow-black cursor-pointer">
            {location}
          </div>
        )}

        <div
          onClick={handleTheme}
          className={`hidden md:flex p-3 gap-5 rounded-full ${
            darkMode ? "bg-black" : "bg-white"
          } transition ease-in-out duration-500 cursor-pointer`}
        >
          <div className={`text-white`}>{moon}</div>
          <div className={`${darkMode ? "text-black" : "text-yellow-400"}`}>
            {sun}
          </div>
        </div>
        <div
          onClick={handleTheme}
          className={`sm:block md:hidden p-3 rounded-full ${
            darkMode ? "bg-black" : "bg-white"
          } transition ease-in-out duration-500 cursor-pointer`}
        >
          <div className={`${darkMode ? "text-white" : "hidden"}`}>{moon}</div>
          <div className={`${darkMode ? "hidden" : "text-yellow-400"}`}>
            {sun}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
