import React, { useState } from "react";
import "./Dish.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Dish = ({ dish }) => {
  const [blurred, setBlurred] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  const handleOrder = () => {
    toast.success("Order Placed Sucessfully!");
  };

  console.log(dish);

  const handleBlur = () => {
    setBlurred(!blurred);
  };

  const handleFailedImage = () => {
    setImageFailed(true);
  };

  const handleLoadedImage = () => {
    setImageFailed(false);
  };

  return (
    <div
      className={`card-container h-56 rounded-xl overflow-hidden${
        imageFailed ? "border-2 border-gray-800" : ""
      }`}
      onClick={handleBlur}
    >
      <img
        src={dish.image}
        alt={dish.name}
        className={`h-full w-full grid object-cover transition-all duration-500 ${
          blurred ? "filter blur-md" : ""
        }`}
        onLoad={handleLoadedImage}
        onError={handleFailedImage}
      />
      {blurred && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-800 bg-opacity-50 text-white p-4 rounded-xl">
          <div className="text-lg md:text-2xl font-semibold">
            <strong>Price : </strong>
            {dish.price}
          </div>
          <div className="mt-2 text-sm md:text-lg">
            <strong>Duration : </strong>
            {dish.duration}
          </div>
          <div className="mt-2 text-sm md:text-lg">
            <strong>Type : </strong> {dish.type}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Stop propagation of the click event
              handleOrder();
            }}
            className="text-base md:text-lg mt-6 bg-green-500 text-white px-4 py-2 rounded-lg shadow-md transition-colors duration-300 hover:translate-y-[-0.25rem]  "
          >
            Order
          </button>
        </div>
      )}
      {!blurred && (
        <h2 className="absolute bottom-2 right-2 bg-black bg-opacity-40 text-white px-2 py-1 text-sm md:text-base rounded-md">
          {dish.name}
        </h2>
      )}
      <ToastContainer />
    </div>
  );
};

export default Dish;
