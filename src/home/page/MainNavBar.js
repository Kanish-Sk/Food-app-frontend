import React, { useState } from "react";
import BackDrop from "../../utility/components/Backdrop";
import SideDrawer from "../../utility/components/SideDrawer";
import SideBar from "../component/Sidebar";
import Navbar from "./NavBar";
import Home from "../../home/page/Home";

const MainNavBar = () => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <React.Fragment>
      {drawerIsOpen && <BackDrop onClick={closeDrawerHandler} />}

      <div className="flex">
        <div className="hidden md:block fixed ">
          <SideBar />
        </div>
        <div className="hidden md:block h-full ml-24">
          <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
            <SideBar />
          </SideDrawer>
        </div>
        <div className="w-full ">
          <Navbar onMenuClick={openDrawerHandler} />
          <Home />
        </div>
      </div>
    </React.Fragment>
  );
};

export default MainNavBar;
