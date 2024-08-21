// MainNavbar.js
import SideBar from "../component/Sidebar";
import TopNavbar from "../component/TopNavBar";
import SideDrawer from "../component/SideDrawer";

const MainNavbar = (props) => {
  return (
    <div className="flex">
      <div className="z-50">
        <div
          className={`${
            props.islogin ? "hidden md:block" : "block"
          }  mt-3 fixed h-screen pb-8`}
        >
          <SideBar
            setIsLogin={props.setIsLogin}
            setUsername={props.setUsername}
          />
        </div>
        <div className="hidden md:block h-full ml-24">
          <SideDrawer
            show={props.drawerIsOpen}
            onClick={props.toggleDrawerHandler}
          >
            <SideBar
              setIsLogin={props.setIsLogin}
              setUsername={props.setUsername}
            />
          </SideDrawer>
        </div>
      </div>
      <div className="w-full flex flex-col">
        <div
          className={`sticky z-10 top-0 h-24 flex items-center w-full ${
            props.darkMode
              ? "bg-gray-900 text-gray-300"
              : "bg-gray-300 text-gray-900"
          }`}
        >
          <TopNavbar
            toggleDrawerHandler={props.toggleDrawerHandler}
            toggleDarkMode={props.toggleDarkMode}
            darkMode={props.darkMode}
          />
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
