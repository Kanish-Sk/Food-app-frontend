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
    <Router>
      <div
        className={`p-4 font-body relative ${
          darkMode ? "bg-gray-950 text-gray-200" : "bg-gray-300 text-gray-900"
        } bg-gray-200`}
      >
        {drawerIsOpen && <BackDrop onClick={closeDrawerHandler} />}

        <div className="flex relative">
          <div className="hidden md:block fixed h-screen pb-8">
            <SideBar />
          </div>
          <div className="hidden md:block h-full ml-24">
            <SideDrawer show={drawerIsOpen} onClick={closeDrawerHandler}>
              <SideBar />
            </SideDrawer>
          </div>
          <div className="w-full">
            <TopNavbar
              onMenuClick={openDrawerHandler}
              toggleDarkMode={toggleDarkMode}
            />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/account" element={<Account />} />
              <Route path="/:hotelname/dishes" element={<HotelDetails />} />
            </Routes>

            <div
              className={` font-body relative ${
                darkMode ? "bg-gray-950" : "bg-gray-300"
              } bg-gray-200`}
            >
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
