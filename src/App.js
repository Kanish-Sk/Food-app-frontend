// App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import Home from "./home/page/Home";
import MainNavbar from "./navbar/page/MainNavbar";
import HotelDetails from "./hotel/page/HotelDetails";
import Footer from "./footer/Footer";
import Profile from "./Proflie/page/Profile";
import { UserContext } from "./Shared/context/UserContext";
import { ToastContainer } from "react-toastify";
import Order from "./Orders/page/Order";
import AuthPage from "./Auth/page/Auth";
import Account from "./Account/page/Accout";

const App = () => {
  const { username, isLogin, darkMode } = useContext(UserContext);
  return (
    <Router>
      <div
        className={`flex flex-col min-h-screen px-4 pb-4 font-body ${
          darkMode ? "bg-gray-900 text-gray-300" : "bg-gray-300 text-gray-900"
        } ${!isLogin ? "overflow-hidden h-svh fixed w-full bg-slate-700" : ""}`}
      >
        <div className={`${!username && !isLogin ? "blur-2xl" : ""}`}>
          <MainNavbar />

          <div className="md:ml-24">
            {isLogin && (
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
        {!username && <AuthPage />}
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
  );
};

export default App;
