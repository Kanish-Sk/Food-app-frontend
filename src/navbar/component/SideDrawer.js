import { CSSTransition } from "react-transition-group";
import ReactDom from "react-dom";

import "./SideDrawer.css";

const SideDrawer = (props) => {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={50}
      classNames="slide-in-left transiton ease-in-out duration-500"
      mountOnEnter
      unmountOnExit
    >
      <aside
        className="fixed left-0 top-0 z-50 w-2/3 h-full"
        onClick={props.onClick}
      >
        {props.children}
      </aside>
    </CSSTransition>
  );
  return ReactDom.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
