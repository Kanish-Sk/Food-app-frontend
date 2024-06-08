import { Link } from "react-router-dom";
import "../utility/styles/buttonStyle.css";

import { socailMediaIcons } from "./FooterIcon";

const Footer = () => {
  return (
    <div className="bg-gray-800 w-full h-16 md:h-20 rounded-2xl p-2 flex items-center justify-around md:justify-center">
      {socailMediaIcons.map((icon) => (
        <Link
          to={icon.link}
          className="cursor-pointer bg-white rounded-full p-2 ml-0 mr-0 md:ml-4 md:mr-4"
        >
          {icon.svg}
        </Link>
      ))}
    </div>
  );
};

export default Footer;
