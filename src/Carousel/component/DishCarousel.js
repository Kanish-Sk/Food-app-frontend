import React, { useState } from "react";
import Carousel from "../component/Carousel";
import { toast } from "react-toastify";

import { FaUtensils, FaRupeeSign, FaHotel } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

const DishCarousel = ({ props }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlide = props[currentSlideIndex];

  const handleOrder = () => {
    toast.success("Order Placed Sucessfully!");
  };

  console.log("current dish", currentSlide);

  const updateCurrentSlideIndex = (index) => {
    setCurrentSlideIndex(index);
  };

  return (
    <div className="md:flex bg-gray-800 rounded-3xl w-full z-10">
      <div className="md:w-1/2 p-2 md:p-4">
        <Carousel slides={props} onSlideChange={updateCurrentSlideIndex} />
      </div>
      <div className="p-1 md:p-3 w-full">
        <div className="w-full p-2 md:p-4 flex flex-col items-center justify-between">
          <h1 className="font-serif text-yellow-400 text-xl md:text2xl font-bold mb-4 md:mb-8 -mt-2 md:mt-2 text-center">
            {currentSlide.name}
          </h1>
          <div className="text-white space-y-1 md:space-y-3 w-full max-w-md">
            <div className="flex items-center p-1 md:p-2 w-full justify-center">
              <FaRupeeSign className="w-5 h-5 mr-3 text-yellow-400" />
              <span>{currentSlide.price}/-</span>
            </div>
            <div className="flex items-center p-1 md:p-2 w-full justify-center">
              <FaUtensils className="w-5 h-5 mr-3 text-green-400" />
              <span>{currentSlide.type}</span>
            </div>
            <div className="flex items-center p-1 md:p-2 w-full justify-center">
              <FaHotel className="w-5 h-5 mr-3 text-blue-400" />
              <span>{currentSlide.hotelName}</span>
            </div>
          </div>
          <button
            onClick={handleOrder}
            className="mt-3 md:mt-10 mb-2 md:mb-0 text-base md:text-lg font-serif w-fit uppercase text-white font-bold bg-gradient-to-r from-green-500 to-green-600 rounded-lg px-3 md:px-4 py-2 transition ease-in-out duration-300 hover:from-green-600 hover:to-green-700 hover:shadow-lg"
          >
            Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default DishCarousel;
