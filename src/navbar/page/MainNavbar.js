// MainNavbar.js
import { useState, useContext, useEffect } from "react";
import SideBar from "../component/Sidebar";
import TopNavbar from "../component/TopNavBar";
import SideDrawer from "../component/SideDrawer";
import BackDrop from "../../Shared/components/Backdrop";
import { UserContext } from "../../Shared/context/UserContext";

const MainNavbar = () => {
  const { isLogin, darkMode } = useContext(UserContext);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawerHandler = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setIsDrawerOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Check the size initially
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isDrawerOpen && <BackDrop onClick={toggleDrawerHandler} />}
      <div className="flex">
        <div className="z-50 hidden md:block">
          <div
            className={`${
              isLogin ? "hidden md:block" : "block"
            } mt-3 fixed h-screen pb-8`}
          >
            <SideBar />
          </div>
          <div className="md:block h-full ml-24">
            <SideDrawer show={isDrawerOpen} onClick={toggleDrawerHandler}>
              <SideBar />
            </SideDrawer>
          </div>
        </div>
        <div className="w-full flex flex-col">
          <div
            className={`sticky z-10 top-0 h-24 flex items-center w-full ${
              darkMode
                ? "bg-gray-900 text-gray-300"
                : "bg-gray-300 text-gray-900"
            }`}
          >
            <TopNavbar toggleDrawerHandler={toggleDrawerHandler} />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainNavbar;
