import React from "react";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loader-container h-full w-full flex justify-center items-center">
      <div className="loader">
        <span className="loader-letter">L</span>
        <span className="loader-letter">O</span>
        <span className="loader-letter">A</span>
        <span className="loader-letter">D</span>
        <span className="loader-letter">I</span>
        <span className="loader-letter">N</span>
        <span className="loader-letter">G</span>
      </div>
    </div>
  );
};

export default Loading;
