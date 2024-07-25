import React, { useEffect, useState } from "react";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaUser,
  FaRupeeSign,
} from "react-icons/fa";
import InfoItem from "./InfoItem";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AccountCard = ({ account, onPay }) => {
  const navigate = useNavigate();
  const { accountStartedDate, hotel } = account;
  const {
    name: hotelName,
    image: hotelImage,
    owner: hotelOwner,
    contact: hotelContact,
    location: hotelLocation,
    dueDate: hotelDueDate,
  } = hotel;

  const [totalAmount, setAmount] = useState(account.totalAmount);
  const [overDue, setOverDue] = useState(false);

  useEffect(() => {
    const dueDate = new Date(hotelDueDate);
    const currentDate = new Date();
    if (dueDate < currentDate) {
      setOverDue(true);
    } else {
      setOverDue(false);
    }
  }, [hotelDueDate]);

  const handlePay = () => {
    setAmount(0);
    onPay(); // Call the passed down onPay function
    toast.success("Amount paid successfully");
  };

  const handleOrders = () => {
    navigate("/order");
  };

  return (
    <div className="bg-gray-800 text-white transition-transform duration-300 hover:scale-105 rounded-lg shadow-md overflow-hidden border border-gray-700">
      <div className="relative h-36 sm:h-48">
        <img
          src={hotelImage}
          alt={`${hotelName}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent flex items-end p-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white truncate">
              {hotelName}
            </h3>
            <p className="text-sm text-gray-300 mt-1">
              <FaUser className="inline mr-2" />
              {hotelOwner}
            </p>
          </div>
        </div>
      </div>
      <div className="p-4 sm:p-6">
        <div className="grid grid-cols-2 gap-5 md:gap-8">
          <InfoItem
            icon={<FaPhoneAlt className="text-blue-400" />}
            label="Contact"
            value={hotelContact}
          />
          <InfoItem
            icon={
              <FaClock
                className={` ${overDue ? "text-red-500" : "text-purple-400"}`}
              />
            }
            label="Due Date"
            value={hotelDueDate}
          />
          <InfoItem
            icon={<FaCalendarAlt className="text-green-400" />}
            label="Started"
            value={accountStartedDate}
          />
          <InfoItem
            icon={<FaRupeeSign className="text-yellow-400" />}
            label="Total"
            value={`${totalAmount}`}
          />
        </div>
        <div className="mt-4 border-t border-gray-600 pt-4">
          <InfoItem
            icon={<FaMapMarkerAlt className="text-red-400" />}
            label="Location"
            value={hotelLocation}
          />
        </div>
        <div className="mt-6 flex flex-row w-full gap-2">
          <button
            onClick={handlePay}
            className={`py-2 w-1/2 rounded-lg transition duration-300 ${
              totalAmount <= 0
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            Pay
          </button>
          <button
            onClick={handleOrders}
            className="bg-green-600 text-white py-2 w-1/2 rounded-lg hover:bg-green-700 transition duration-300"
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
