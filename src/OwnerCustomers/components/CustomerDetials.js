import React from "react";
import {
  FaPhone,
  FaEnvelope,
  FaUserCircle,
  FaMoneyBillAlt,
  FaMapMarkerAlt,
  FaListAlt,
  FaCreditCard,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const CustomerDetailsCard = ({ id, customer }) => {
  return (
    <div
      id={id}
      className="bg-gray-800
                 backdrop-blur-xl border border-white/20 
                 rounded-2xl shadow-2xl p-6 text-white 
                 relative overflow-hidden"
    >
      <div className="flex items-center relative z-10">
        {customer.image ? (
          <img
            src={customer.image}
            alt={customer.customername}
            className="w-20 h-20 rounded-full mr-4 border-2 border-white/30 shadow-lg"
          />
        ) : (
          <FaUserCircle className="w-20 h-20 rounded-full mr-4 text-blue-300" />
        )}
        <div className="">
          <h3 className="text-xl font-bold text-yellow-400 drop-shadow-md">
            {customer.username.charAt(0).toUpperCase() +
              customer.username.slice(1)}
          </h3>
          <div className="flex items-center mt-2">
            <FaPhone className="mr-2 text-sm text-orange-300" />
            <p className="text-sm opacity-90">{customer.phoneNumber}</p>
          </div>
          <div className="flex items-center mt-2">
            <FaEnvelope className="mr-2 text-sm text-green-300" />
            <p className="text-sm opacity-90">{customer.email}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 relative z-10">
        <h3 className="text-lg font-bold text-white/80">Account Details</h3>
        <div className="flex items-center mt-2 bg-white/10 rounded-lg p-2">
          {customer.accounts && customer.accounts.length > 0 ? (
            <>
              <FaCreditCard className="mr-2 text-sm text-indigo-300" />
              <Link
                to={`/accounts/${customer.id}`}
                className="text-sm hover:text-green-400"
              >
                Accounts:{" "}
                <span className="font-semibold">
                  {customer.accounts.length}
                </span>
              </Link>
            </>
          ) : (
            <div className="text-sm text-white/50">No accounts</div>
          )}
        </div>

        <div className="flex items-center mt-2 bg-white/10 rounded-lg p-2">
          {customer.orders && customer.orders.length > 0 ? (
            <>
              <FaListAlt className="mr-2 text-sm text-teal-300" />
              <Link
                to={`/orders/${customer.id}`}
                className="text-sm hover:text-green-400 transition-colors"
              >
                Orders:{" "}
                <span className="font-semibold">{customer.orders.length}</span>
              </Link>
            </>
          ) : (
            <div className="text-sm text-white/50">No orders</div>
          )}
        </div>

        <div className="flex items-center mt-2 bg-white/10 rounded-lg p-2">
          <FaMoneyBillAlt className="mr-2 text-sm text-yellow-300" />
          <p className="text-sm">
            Total Amount Paid:{" "}
            <span className="font-semibold">${customer.amount || 0}</span>
          </p>
        </div>
      </div>

      <div className="mt-6 relative z-10">
        <h3 className="text-lg font-bold text-white/80">Location</h3>
        <div className="flex items-center mt-2 bg-white/10 rounded-lg p-2">
          <FaMapMarkerAlt className="mr-2 text-sm text-red-300" />
          <p className="text-sm opacity-90">
            {customer.location || "Location not specified"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetailsCard;
