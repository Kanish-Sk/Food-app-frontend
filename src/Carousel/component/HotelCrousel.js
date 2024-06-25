import React, { useState } from "react";
import Carousel from "../component/Carousel";
import { useNavigate } from "react-router-dom";

const HotelCarousel = ({ props }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlide = props[currentSlideIndex];

  const navigate = useNavigate();

  const handleViewHotel = () => {
    navigate(`${currentSlide.name}/dishes`, {
      state: { hotelDetails: currentSlide },
    });
  };

  console.log("current hotel", currentSlide);

  const updateCurrentSlideIndex = (index) => {
    setCurrentSlideIndex(index);
  };

  return (
    <div className="md:flex bg-gray-800 rounded-3xl w-full -z-[-100px]">
      <div className="md:w-1/2 p-2 md:p-4">
        <Carousel slides={props} onSlideChange={updateCurrentSlideIndex} />
      </div>
      <div className="p-1 md:p-3 w-full">
        <div className="w-full p-2 md:p-4 flex flex-col items-center justify-between">
          <h1 className="font-serif text-green-600 text-lg text-center md:text-2xl font-bold -mt-2 md:mt-2 whitespace-nowrap">
            {currentSlide.name}
          </h1>
          <div className="text-white font-extralight mt-1 md:mt-4 whitespace-nowrap">
            <div className="p-1 md:p-4">
              <strong>Type : </strong> {currentSlide.type}
            </div>
            <div className="p-1 md:p-4">
              <strong>Timing : </strong> {currentSlide.timing}
            </div>
            <div className="p-1 md:p-4">
              <strong>Location : </strong> {currentSlide.location}
            </div>
          </div>
          <button
            onClick={handleViewHotel}
            className="mt-3 md:mt-10 text-sm md:text-base font-serif uppercase text-gray-200 font-bold bg-green-600 rounded-lg px-3 md:px-4 py-2 transition ease-in-out duration-200 hover:translate-y-[-0.25rem]"
          >
            view
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCarousel;
