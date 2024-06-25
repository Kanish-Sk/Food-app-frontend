import React, { useState, useCallback } from "react";
import "./Dish.css";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Dish = ({ dish }) => {
  const [blurred, setBlurred] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const handleOrder = useCallback((e) => {
    e.stopPropagation();
    toast.success("Order Placed Successfully!");
    setBlurred((prevBlurred) => !prevBlurred);
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

  return (
    <div
      className={`card-container h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden relative ${
        imageFailed ? "border-2 border-gray-300" : ""
      }`}
      onClick={handleBlur}
    >
      <img
        src={dish.image}
        alt={dish.name}
        className={`h-full w-full object-cover transition-all duration-500 ${
          blurred ? "filter blur-sm scale-110" : ""
        }`}
        onLoad={handleLoadedImage}
        onError={handleFailedImage}
      />
      {blurred && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90 flex flex-col items-center justify-center text-white p-4 sm:p-6">
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-4">
            {dish.name}
          </h3>
          <div className="w-full max-w-xs">
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <span className="text-gray-300 text-xs sm:text-sm">Price</span>
              <span className="text-base sm:text-lg md:text-xl font-semibold">
                ₹{dish.price}
              </span>
            </div>
            <div className="flex justify-between items-center mb-2 sm:mb-3">
              <span className="text-gray-300 text-xs sm:text-sm">
                Preparation Time
              </span>
              <span className="text-xs sm:text-sm">{dish.duration}</span>
            </div>
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <span className="text-gray-300 text-xs sm:text-sm">Type</span>
              <span className="capitalize text-xs sm:text-sm">{dish.type}</span>
            </div>
          </div>
          <button
            onClick={handleOrder}
            className="w-full max-w-xs bg-green-500 hover:bg-green-600 text-white font-bold py-1 sm:py-2 px-4 rounded-lg text-xs sm:text-sm transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg"
          >
            Order Now
          </button>
        </div>
      )}
      {!blurred && (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-4">
          <h2 className="text-white text-sm sm:text-base md:text-lg font-semibold">
            {dish.name}
          </h2>
          <span className="text-gray-300 text-xs sm:text-sm">{dish.type}</span>
        </div>
      )}
    </div>
  );
};

export default Dish;
