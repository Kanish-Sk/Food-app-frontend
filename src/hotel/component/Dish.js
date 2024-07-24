import React, { useState, useCallback } from "react";
import "./Dish.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import {
  FaRupeeSign,
  FaClock,
  FaUtensils,
  FaShoppingCart,
} from "react-icons/fa";

const Dish = ({ dish }) => {
  const [blurred, setBlurred] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const handleOrder = useCallback((e) => {
    e.stopPropagation();
    toast.success("Order Placed Successfully!");
  }, []);

  const handleBlur = useCallback(() => {
    setBlurred((prevBlurred) => !prevBlurred);
  }, []);

  const handleFailedImage = useCallback(() => {
    setImageFailed(true);
  }, []);

  const handleLoadedImage = useCallback(() => {
    setImageFailed(false);
  }, []);

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case "veg":
        return "bg-green-500";
      case "non-veg":
        return "bg-red-500";
      default:
        return "bg-yellow-500";
    }
  };

  return (
    <div
      className={`card-container h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden relative ${
        imageFailed ? "border-2 border-gray-300" : ""
      } shadow-lg transition-all duration-300 hover:shadow-xl`}
      onClick={handleBlur}
    >
      <img
        src={dish.image}
        alt={dish.name}
        className={`h-full w-full object-cover transition-all duration-500 ${
          blurred ? "filter blur-sm scale-110 brightness-50" : ""
        }`}
        onLoad={handleLoadedImage}
        onError={handleFailedImage}
      />
      <div
        className={`absolute top-2 right-2 ${getTypeColor(
          dish.type
        )} px-2 py-1 rounded-full text-xs font-semibold text-white`}
      >
        {dish.type}
      </div>
      {blurred && (
        <div className="absolute inset-0 bg-gradient-to-b from-gray-600/90 to-gray-800/90 flex flex-col items-center justify-center text-white p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-4 text-yellow-300 flex items-center">
            {dish.name}
          </h3>
          <div className="w-full max-w-xs">
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <span className="text-gray-300 text-xs sm:text-sm flex items-center">
                <FaRupeeSign className="mr-1 text-green-400" /> Price
              </span>
              <span className="text-base sm:text-lg md:text-xl font-semibold flex items-center text-green-400">
                <FaRupeeSign className="mr-1" />
                {dish.price}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <span className="text-gray-300 text-xs sm:text-sm flex items-center">
                <FaClock className="mr-1 text-blue-400" /> Preparation Time
              </span>
              <span className="text-xs sm:text-sm text-blue-400">
                {dish.duration}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <span className="text-gray-300 text-xs sm:text-sm flex items-center">
                <FaUtensils className="mr-1 text-pink-400" /> Type
              </span>
              <span className="capitalize text-xs sm:text-sm text-pink-400">
                {dish.type}
              </span>
            </div>
          </div>
          <button
            onClick={handleOrder}
            className="w-full max-w-xs bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-1 sm:py-2 px-4 rounded-lg text-xs sm:text-sm transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
          >
            <FaShoppingCart className="mr-2" /> Order Now
          </button>
        </div>
      )}
      {!blurred && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-800 to-transparent p-2 sm:p-4">
          <h2 className="text-yellow-300 text-sm sm:text-base md:text-lg font-semibold flex items-center">
            {dish.name}
          </h2>
          <span className="text-gray-300 text-xs sm:text-sm flex items-center">
            <FaUtensils className="mr-1 text-pink-400" /> {dish.type}
          </span>
          <span className="text-gray-300 text-xs sm:text-sm flex items-center mt-1">
            <FaRupeeSign className="mr-1 text-green-400" /> {dish.price}
          </span>
        </div>
      )}
    </div>
  );
};

export default Dish;
