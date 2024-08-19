import React, { useContext, useEffect, useState, useRef } from "react";
import { search, close } from "../../Shared/svg/icons";
import { UserContext } from "../../Shared/context/UserContext";
import { useLocation } from "react-router-dom";

function SearchBar() {
  const location = useLocation();
  const [isActive, setIsActive] = useState(false);
  const { setSearchQuery } = useContext(UserContext);
  const inputRef = useRef(null);

  const handleClick = () => {
    setIsActive(!isActive);
    if (!isActive) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 0);
    }
  };

  const handleClose = () => {
    setSearchQuery("");
    setIsActive(!isActive);
  };

  useEffect(() => {
    setSearchQuery("");
    setIsActive(false);
  }, [location, setSearchQuery]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="flex">
      {isActive && (
        <form
          onSubmit={(e) => e.preventDefault()}
          className={`${
            isActive ? "block transition ease-in-out duration-500" : "hidden"
          }`}
        >
          <input
            type="text"
            placeholder="Search"
            className="focus:outline-none text-black px-1 mr-3 w-28 md:w-36"
            onChange={handleChange}
            ref={inputRef}
          />
        </form>
      )}
      {!isActive && <button onClick={handleClick}>{search}</button>}
      {isActive && <button onClick={handleClose}>{close}</button>}
    </div>
  );
}

export default SearchBar;
