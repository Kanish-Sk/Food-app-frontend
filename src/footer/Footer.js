import "./footer.css";

const Footer = () => {
  return (
    <div className="bg-gray-800 w-full h-16 md:h-20 rounded-2xl p-2 flex items-center justify-center bottom-0">
      <ul className="flex space-x-4">
        <li className="item">
          <a href="mailto:kanishshivan@gmail.com" aria-label="Email">
            <i className="fas fa-envelope logo"></i>
          </a>
        </li>
        <li className="item">
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <i className="fab fa-instagram logo"></i>
          </a>
        </li>
        <li className="item">
          <a
            href="https://www.linkedin.com/in/kanish-s-1446a2247"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <i className="fab fa-linkedin logo"></i>
          </a>
        </li>
        <li className="item">
          <a
            href="https://x.com/home?lang=en"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
          >
            <i className="fa-brands fa-x-twitter logo"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
