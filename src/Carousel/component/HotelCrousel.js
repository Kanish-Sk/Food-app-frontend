import React, { useState } from "react";
import Carousel from "../component/Carousel";
import { useNavigate } from "react-router-dom";
import { FaUtensils, FaClock, FaMapMarkerAlt } from "react-icons/fa";

const HotelCarousel = ({ props }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlide = props[currentSlideIndex];

  const navigate = useNavigate();

  const handleViewHotel = () => {
    navigate(`${currentSlide.name}/dishes`, {
      state: { hotelDetails: currentSlide },
    });
  };

  const updateCurrentSlideIndex = (index) => {
    setCurrentSlideIndex(index);
  };

  return (
    <div className="md:flex bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl w-full shadow-2xl overflow-hidden">
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
              <FaUtensils className="w-5 h-5 mr-3 text-green-400" />
              <span>{currentSlide.type}</span>
            </div>
            <div className="flex items-center p-1 md:p-2 w-full justify-center">
              <FaClock className="w-5 h-5 mr-3 text-blue-400" />
              <span>{currentSlide.timing}</span>
            </div>
            <div className="flex items-center p-1 md:p-2 w-full justify-center">
              <FaMapMarkerAlt className="w-5 h-5 mr-3 text-red-400" />
              <span>{currentSlide.location}</span>
            </div>
          </div>
          <button
            onClick={handleViewHotel}
            className="mt-3 md:mt-10 mb-2 md:mb-0 text-base md:text-lg font-serif w-fit uppercase text-white font-bold bg-gradient-to-r from-green-500 to-green-600 rounded-lg px-3 md:px-4 py-2 transition ease-in-out duration-300 hover:from-green-600 hover:to-green-700 hover:shadow-lg"
          >
            Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCarousel;
