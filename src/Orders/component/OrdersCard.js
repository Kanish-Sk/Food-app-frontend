import React from "react";
import {
  FaHotel,
  FaCalendarAlt,
  FaShoppingCart,
  FaTimesCircle,
  FaRedoAlt,
  FaCreditCard,
} from "react-icons/fa";

const OrderCard = ({
  order,
  onReOrder,
  onPayOrder,
  onCancelOrder,
  statusStats,
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      key={order.orderId}
      className="rounded-lg shadow-lg overflow-hidden transition-transform bg-gray-800 duration-300 hover:scale-105"
    >
      <div className="flex flex-row h-full">
        <div className="flex-shrink-0 bg-white w-24 sm:w-32 md:w-48">
          <img
            className="h-full w-full object-cover"
            src={order.dish.image}
            alt={order.dish.name}
          />
        </div>
        <div className="p-2 sm:p-3 md:p-4 w-full flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-1 sm:mb-2">
              <div
                className={`inline-block px-2 py-1 text-xs sm:text-sm font-semibold rounded-full ${
                  statusStats[order.status]
                }`}
              >
                {order.status}
              </div>
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-green-400">
                ₹{order.price}
              </span>
            </div>
            <h2 className="text-sm sm:text-lg md:text-xl font-bold mb-1 sm:mb-2 text-yellow-400">
              {order.dish.name}
            </h2>
            <div className="flex items-center mb-1 text-gray-300">
              <FaHotel className="mr-1 text-xs sm:text-sm" />
              <p className="text-xs sm:text-sm md:text-base font-medium">
                {order.hotel.name}
              </p>
            </div>
            <div className="flex items-center text-gray-400">
              <FaCalendarAlt className="mr-1 text-xs sm:text-sm" />
              <p className="text-xs sm:text-sm">
                {formatDate(order.orderDate)}
              </p>
            </div>
            <div className="flex items-center mt-1 text-gray-400">
              <FaShoppingCart className="mr-1 text-xs sm:text-sm" />
              <p className="text-xs sm:text-sm">
                Quantity:
                <span className="font-semibold">{order.quantity}</span>
              </p>
            </div>
          </div>
          <div className="mt-2 sm:mt-3 flex items-center justify-end">
            {order.status === "Waiting" && (
              <button
                onClick={() => onCancelOrder(order.orderId)}
                className="flex items-center px-2 sm:px-3 py-1 sm:py-2 bg-red-600 text-white text-xs sm:text-sm rounded-full hover:bg-red-700 transition duration-300"
              >
                <FaTimesCircle className="mr-1 sm:mr-2" />
                Cancel
              </button>
            )}
            {order.status === "Preparing" && !order.paid && (
              <button
                onClick={() => onPayOrder(order.orderId)}
                className="flex items-center px-2 sm:px-3 py-1 sm:py-2 bg-green-600 text-white text-xs sm:text-sm rounded-full hover:bg-green-700 transition duration-300"
              >
                <FaCreditCard className="mr-1 sm:mr-2" />
                Pay
              </button>
            )}
            {["Delivered", "Cancelled"].includes(order.status) && (
              <button
                onClick={() => onReOrder(order)}
                className="flex items-center px-2 sm:px-3 py-1 sm:py-2 bg-blue-600 text-white text-xs sm:text-sm rounded-full hover:bg-blue-700 transition duration-300"
              >
                <FaRedoAlt className="mr-1 sm:mr-2" />
                Reorder
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
