import Account from "./home/component/Accout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState } from "react";
import Home from "./home/page/Home";
import BackDrop from "./utility/components/Backdrop";
import SideBar from "./navbar/component/Sidebar";
import TopNavbar from "./navbar/component/TopNavBar";
import SideDrawer from "./navbar/component/SideDrawer";
import HotelDetails from "./home/page/HotelDetails";
import Footer from "./footer/Footer";

import "@fortawesome/fontawesome-free/css/all.min.css";
import { UserProvider } from "./utility/context/UserContext";
import { ToastContainer } from "react-toastify";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <UserProvider>
      <Router>
        <div
          className={`flex flex-col min-h-screen px-4 pb-4 font-body ${
            darkMode ? "bg-gray-950 text-gray-200" : "bg-gray-300 text-gray-900"
          }`}
        >
          {drawerIsOpen && <BackDrop onClick={closeDrawerHandler} />}

          <div className="flex">
            <div className="z-50">
              <div className="hidden md:block fixed h-screen pb-8">
                <SideBar />
              </div>
              <div className="hidden md:block h-full ml-24">
                <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
                  <SideBar />
                </SideDrawer>
              </div>
            </div>
            <div className="w-full flex flex-col">
              <div className="sticky bg-gray-300 top-0 z-10 h-24 flex items-center w-full">
                <TopNavbar
                  onMenuClick={openDrawerHandler}
                  toggleDarkMode={toggleDarkMode}
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
}

export default App;
