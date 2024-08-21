// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import Home from "./home/page/Home";
import BackDrop from "./Shared/components/Backdrop";
import MainNavbar from "./navbar/page/MainNavbar";
import HotelDetails from "./hotel/page/HotelDetails";
import Footer from "./footer/Footer";
import Profile from "./Proflie/page/Profile";
import { UserContext, UserProvider } from "./Shared/context/UserContext";
import { ToastContainer } from "react-toastify";
import Order from "./Orders/page/Order";
import AuthPage from "./Auth/page/Auth";
import Account from "./Account/page/Accout";

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
          } `}
        >
          <div className={`${!username && !islogin ? "blur-xl" : ""}`}>
            {(!islogin || drawerIsOpen) && (
              <BackDrop onClick={toggleDrawerHandler} />
            )}

            <MainNavbar
              toggleDrawerHandler={toggleDrawerHandler}
              toggleDarkMode={toggleDarkMode}
              darkMode={darkMode}
              setIsLogin={setIsLogin}
              setUsername={setUsername}
              drawerIsOpen={drawerIsOpen}
              islogin={islogin}
            />

            <div className="md:ml-24">
              {islogin && (
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/order" element={<Order />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/:hotelname/dishes" element={<HotelDetails />} />
                </Routes>
              )}
              <Footer />
            </div>
          </div>

          {!islogin && (
            <AuthPage setIsLogin={setIsLogin} setUsername={setUsername} />
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
        </div>
      </Router>
    </UserProvider>
  );
};

export default App;
