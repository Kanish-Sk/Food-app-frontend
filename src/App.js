import Account from "./home/component/Accout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext, useState } from "react";
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
  const { username } = useContext(UserContext);
  const [darkMode, setDarkMode] = useState(false);
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const toggleDrawerHandler = () => {
    setDrawerIsOpen(!drawerIsOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <UserProvider>
      <Router>
        <div
          className={`flex flex-col min-h-screen px-4 pb-4 font-body ${
            darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
          } ${!username ? "blur-md" : ""}`}
        >
          {drawerIsOpen && <BackDrop onClick={toggleDrawerHandler} />}

          <div className="flex">
            <div className="z-50">
              <div className="hidden md:block mt-3 fixed h-screen pb-8">
                <SideBar />
              </div>
              <div className="hidden md:block h-full ml-24">
                <SideDrawer show={drawerIsOpen} onClick={toggleDrawerHandler}>
                  <SideBar />
                </SideDrawer>
              </div>
            </div>
            <div className="w-full flex flex-col">
              <div
                className={`sticky z-10 top-0 h-24 flex items-center w-full ${
                  darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"
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
        {!username && <Login />}
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
