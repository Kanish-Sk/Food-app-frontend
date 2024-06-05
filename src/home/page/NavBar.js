import { useState } from "react";
import { menu, location, moon, sun } from "../../utility/svg/icons";
import SearchBar from "../component/SearchBar";

const Navbar = ({ onMenuClick }) => {
  const [theme, setTheme] = useState("light");

  return (
    <div className="md:mt-1 p-4 flex items-center bg-gray-800 rounded-2xl mb-3">
      <div
        className=" flex justify-center text-white items-center"
        onClick={onMenuClick}
      >
        {menu}
      </div>
      <div className="hidden md:block text-white ml-2 justify-center uppercase font-bold  absolute">
        <div>Grab And Go</div>
      </div>
      <div className="flex justify-end items-center gap-5 grow">
        <div className="border-white bg-white rounded-md p-2 ">
          <SearchBar />
        </div>
        <div className="border-white bg-white rounded-md p-2 hover:shadow-md hover:shadow-black cursor-pointer">
          {location}
        </div>
        <div
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className={`hidden md:flex  p-3 gap-5 rounded-full  ${
            theme === "light" ? "bg-white" : "bg-black"
          } transition ease-in-out duration-500 cursor-pointer`}
        >
          <div className="text-white ">{moon}</div>
          <div
            className={`${
              theme === "light" ? "text-yellow-400 " : "text-black "
            }`}
          >
            {sun}
          </div>
        </div>

        <div
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className={`sm:block md:hidden p-3 rounded-full  ${
            theme === "light" ? "bg-white" : "bg-black"
          } transition ease-in-out duration-500 cursor-pointer`}
        >
          <div className={`${theme === "dark" ? "text-white " : "hidden "}`}>
            {moon}
          </div>
          <div
            className={`${theme === "light" ? "text-yellow-400 " : "hidden "}`}
          >
            {sun}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
