import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { menu, location, moon, sun } from "../../Shared/svg/icons";
import SearchBar from "./SearchBar";
import { UserContext } from "../../Shared/context/UserContext";

const TopNavbar = ({ toggleDrawerHandler }) => {
  const { darkMode, setDarkMode, darkModeEditPermission } =
    useContext(UserContext);

  const locationPath = useLocation().pathname;

  const handleThemeToggle = () => {
    if (darkModeEditPermission) {
      setDarkMode(!darkMode);
    }
  };

  return (
    <div className="p-4 bg-gray-800 flex items-center rounded-2xl w-full">
      {/* Menu icon for small screen */}
      <div
        className="flex justify-center  text-white items-center cursor-pointer"
        onClick={toggleDrawerHandler}
      >
        {menu}
      </div>

      {/* Title */}
      <div className="hidden md:block text-white ml-2 uppercase text-2xl font-bold">
        Grab And Go
      </div>

      {/* Search bar */}
      <div className="flex justify-end items-center gap-5 grow">
        <div className="bg-white rounded-md p-2">
          <SearchBar />
        </div>

        {locationPath === "/" && (
          <div className="bg-white rounded-md p-2 hover:shadow-md hover:shadow-black cursor-pointer">
            {location}
          </div>
        )}

        {/* Conditionally render dark mode buttons based on darkModeEditPermission */}
        {darkModeEditPermission && (
          <>
            {/* Dark mode button for medium screen */}
            <div
              onClick={handleThemeToggle}
              className={`hidden md:flex p-3 gap-5 rounded-full transition ease-in-out duration-500 cursor-pointer ${
                darkMode ? "bg-black" : "bg-white"
              }`}
            >
              <div className="text-white">{moon}</div>
              <div className={`${darkMode ? "text-black" : "text-yellow-400"}`}>
                {sun}
              </div>
            </div>

            {/* Dark mode button for small screen */}
            <div
              onClick={handleThemeToggle}
              className={`sm:block md:hidden p-3 rounded-full transition ease-in-out duration-500 cursor-pointer ${
                darkMode ? "bg-black" : "bg-white"
              }`}
            >
              <div className={`${darkMode ? "text-white" : "hidden"}`}>
                {moon}
              </div>
              <div className={`${darkMode ? "hidden" : "text-yellow-400"}`}>
                {sun}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TopNavbar;
