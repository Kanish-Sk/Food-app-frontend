import ReactDom from "react-dom";

const BackDrop = (props) => {
  return ReactDom.createPortal(
    <div
      className="fixed top-0 left-0 w-full h-full bg-gray-700 opacity-75 z-10"
      onClick={props.onClick}
    ></div>,
    document.getElementById("backdrop-div")
  );
};

export default BackDrop;
