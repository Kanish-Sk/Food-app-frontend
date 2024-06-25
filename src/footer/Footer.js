import "./footer.css";

const Footer = () => {
  return (
    <div className="bg-gray-800 w-full h-16 md:h-20 rounded-2xl p-2 flex items-center justify-center bottom-0">
      <ul>
        <li className="item">
          <a href="#">
            <i className="fas fa-envelope logo"></i>
          </a>
        </li>
        <li className="item">
          <a href="#">
            <i className="fab fa-instagram logo"></i>
          </a>
        </li>
        <li className="item">
          <a href="#">
            <i className="fab fa-linkedin logo"></i>
          </a>
        </li>
        <li className="item">
          <a href="#">
            <i class="fa-brands fa-x-twitter logo"></i>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
