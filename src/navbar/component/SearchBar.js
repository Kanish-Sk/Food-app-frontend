import React, { useState } from "react";
import { search, close } from "../../utility/svg/icons";

function SearchBar() {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div className="flex">
      {isActive && (
        <form
          className={`${
            isActive ? "block transition ease-in-out duration-500" : "hidden"
          }`}
        >
          <input
            type="text"
            placeholder="Search"
            className=" focus:outline-none px-1 mr-3 w-28 md:w-36"
          />
        </form>
      )}
      {!isActive && <button onClick={handleClick}>{search}</button>}

      {isActive && <button onClick={handleClick}>{close}</button>}
    </div>
  );
}

export default SearchBar;
