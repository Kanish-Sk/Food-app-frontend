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
import Cart from "./Cart/page/Cart";
import AuthPage from "./Auth/page/Auth";
import Account from "./Account/page/Accout";
import OwnerHome from "./ownerHome/page/OwnerHome";
import OwnerProfile from "./OwnerProfile/page/OwnerPrfile";
import OwnerCustomers from "./OwnerCustomers/page/OwnerCustomers";
import OwnerAccount from "./OwnerAccount/page/OwnerAccount";
import OwnerOrders from "./OwnerOrders/page/OwnerOrders";
import BottomCartIcon from "./Cart/components/BottomCart";

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
                <Route path="/cart" element={<Cart />} />
                <Route path="/owner" element={<OwnerHome />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/owner/profile" element={<OwnerProfile />} />
                <Route
                  path="/owner/customer/:customerId"
                  element={<OwnerCustomers />}
                />
                <Route path="/owner/customers" element={<OwnerCustomers />} />
                <Route path="/order/:hotelName" element={<Order />} />
                <Route path="/owner/order" element={<OwnerOrders />} />
                <Route path="/account" element={<Account />} />
                <Route
                  path="/owner/account/:accoundId"
                  element={<OwnerAccount />}
                />
                <Route path="/owner/accounts" element={<OwnerAccount />} />
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
        {isLogin && <BottomCartIcon />}
      </div>
    </Router>
  );
};

export default App;
