import { CSSTransition } from "react-transition-group";
import ReactDom from "react-dom";

import "../../utility/components/SideDrawer.css";

const SideDrawer = (props) => {
  const content = (
    <CSSTransition
      in={props.show}
      timeout={200}
      classNames="slide-in-out"
      mountOnEnter
      unmountOnExit
    >
      <aside
        className="fixed left-0 top-0 z-50 w-2/3 h-full bg-white shadow-2xl shadow-gray-500"
        onClick={props.onClick}
      >
        {props.children}
      </aside>
    </CSSTransition>
  );
  return ReactDom.createPortal(content, document.getElementById("drawer-hook"));
};

export default SideDrawer;
