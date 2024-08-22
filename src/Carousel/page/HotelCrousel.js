// HotelCarousel.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SharedCarouselContent from "../component/SharedCarouselContent";
import Carousel from "../component/Carousel";

const HotelCarousel = ({ props }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlide = props[currentSlideIndex];
  const navigate = useNavigate();

  const handleViewHotel = () => {
    navigate(`${currentSlide.name}/dishes`, {
      state: { hotelDetails: currentSlide },
    });
  };

  return (
    <div className="md:flex bg-gray-800 rounded-3xl w-full shadow-2xl overflow-hidden">
      <div className="md:w-1/2 p-2 md:p-4">
        <Carousel slides={props} onSlideChange={setCurrentSlideIndex} />
      </div>
      <div className="p-1 md:p-3 w-full">
        <SharedCarouselContent
          slide={currentSlide}
          type="hotel"
          onButtonClick={handleViewHotel}
          buttonText="Menu"
        />
      </div>
    </div>
  );
};

export default HotelCarousel;
