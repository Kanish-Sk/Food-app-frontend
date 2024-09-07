import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./footer.css";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="bg-gray-800 w-full h-16 md:h-20 rounded-2xl p-2 flex items-center justify-center bottom-0">
      <ul className="flex space-x-4">
        <li className="item">
          <a href="mailto:kanishshivan@gmail.com" aria-label="Email">
            <FontAwesomeIcon icon={faEnvelope} className="logo" />
          </a>
        </li>
        <li className="item">
          <a href="https://www.instagram.com" aria-label="Instagram">
            <FaInstagram className="logo" />
          </a>
        </li>
        <li className="item">
          <a
            href="https://www.linkedin.com/in/kanish-s-1446a2247"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="logo" />
          </a>
        </li>
        <li className="item">
          <a
            href="https://x.com/home?lang=en"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="bg-red-900f"
          >
            <FaTwitter className="logo" />
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
