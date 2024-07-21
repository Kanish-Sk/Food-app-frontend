import Account from "./home/component/Accout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Home from "./home/page/Home";
import BackDrop from "./utility/components/Backdrop";
import SideBar from "./navbar/component/Sidebar";
import TopNavbar from "./navbar/component/TopNavBar";
import SideDrawer from "./navbar/component/SideDrawer";
import HotelDetails from "./home/page/HotelDetails";
import Footer from "./footer/Footer";

import "@fortawesome/fontawesome-free/css/all.min.css";
import { UserContext, UserProvider } from "./utility/context/UserContext";
import { ToastContainer } from "react-toastify";
import Login from "./Auth/Login";

const App = () => {
  const { username, setUsername } = useContext(UserContext);
  const [darkMode, setDarkMode] = useState(false);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  const [islogin, setIsLogin] = useState(false);

  const toggleDrawerHandler = () => {
    setDrawerIsOpen(!drawerIsOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setDrawerIsOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize(); // Check the size initially
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (!islogin) {
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.height = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
  }, [islogin]);

  return (
    <UserProvider>
      <Router>
        <div
          className={`flex flex-col min-h-screen px-4 pb-4 font-body ${
            darkMode ? "bg-gray-900 text-gray-300" : "bg-gray-300 text-gray-900"
          } ${!username && !islogin ? "blur-xl" : ""}`}
        >
          {(!islogin || drawerIsOpen) && (
            <BackDrop onClick={toggleDrawerHandler} />
          )}

          <div className="flex">
            <div className="z-50">
              <div className="hidden md:block mt-3 fixed h-screen pb-8">
                <SideBar setIsLogin={setIsLogin} setUsername={setUsername} />
              </div>
              <div className="hidden md:block h-full ml-24">
                <SideDrawer show={drawerIsOpen} onClick={toggleDrawerHandler}>
                  <SideBar setIsLogin={setIsLogin} setUsername={setUsername} />
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
                <TopNavbar
                  toggleDrawerHandler={toggleDrawerHandler}
                  toggleDarkMode={toggleDarkMode}
                  darkMode={darkMode}
                />
              </div>

              <div className="relative">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/:hotelname/dishes" element={<HotelDetails />} />
                </Routes>
              </div>

              <Footer />
            </div>
          </div>
        </div>
        {!islogin && (
          <Login setIsLogin={setIsLogin} setUsername={setUsername} />
        )}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </UserProvider>
  );
};

export default App;
