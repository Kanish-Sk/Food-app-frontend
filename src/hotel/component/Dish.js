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
  const [expanded, setExpanded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const handleOrder = useCallback((e) => {
    e.stopPropagation();
    toast.success("Order Placed Successfully!");
    setExpanded(false);
  }, []);

  const handleExpand = useCallback(() => {
    setExpanded((prevExpanded) => !prevExpanded);
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
      className={`card-container h-72 md:h-80 rounded-2xl overflow-hidden relative ${
        imageFailed ? "border-2 border-gray-300" : ""
      } shadow-lg transition-all duration-300 hover:shadow-2xl cursor-pointer group`}
      onClick={handleExpand}
    >
      <img
        src={dish.image}
        alt={dish.name}
        className={`h-full w-full object-cover transition-all duration-500 ${
          expanded
            ? "filter blur-sm scale-110 brightness-50"
            : "group-hover:scale-105"
        }`}
        onLoad={handleLoadedImage}
        onError={handleFailedImage}
      />
      <div
        className={`absolute top-3 right-3 ${getTypeColor(
          dish.type
        )} px-3 py-1 rounded-full text-xs font-semibold text-white shadow-md`}
      >
        {dish.type}
      </div>
      {expanded ? (
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 flex flex-col items-center justify-center text-white p-6">
          <h3 className="text-xl md:text-3xl font-bold mb-4 text-yellow-300 flex items-center">
            {dish.name}
          </h3>
          <div className="w-full max-w-xs space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm flex items-center">
                <FaRupeeSign className="mr-2 text-green-400" /> Price
              </span>
              <span className="text-xl md:text-2xl font-semibold flex items-center text-green-400">
                <FaRupeeSign className="mr-1" />
                {dish.price}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm flex items-center">
                <FaClock className="mr-2 text-blue-400" /> Prep Time
              </span>
              <span className="text-sm text-blue-400">{dish.duration}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm flex items-center">
                <FaUtensils className="mr-2 text-pink-400" /> Type
              </span>
              <span className="capitalize text-sm text-pink-400">
                {dish.type}
              </span>
            </div>
          </div>
          <button
            onClick={handleOrder}
            className="w-full max-w-xs mt-6 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-3 px-4 rounded-lg text-sm transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
          >
            <FaShoppingCart className="mr-2" /> Order Now
          </button>
        </div>
      ) : (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-900 to-transparent p-4 sm:p-6">
          <h2 className="text-yellow-300 text-lg md:text-2xl font-bold mb-2">
            {dish.name}
          </h2>
          <div className="flex justify-between items-center">
            <span className="text-gray-300 text-sm sm:text-base flex items-center">
              <FaUtensils className="mr-2 text-pink-400" /> {dish.type}
            </span>
            <span className="text-gray-300 text-sm sm:text-base flex items-center">
              <FaRupeeSign className="mr-1 text-green-400" /> {dish.price}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dish;
