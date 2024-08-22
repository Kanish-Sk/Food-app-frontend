import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SharedCarouselContent from "../component/SharedCarouselContent";
import Carousel from "../component/Carousel";

const DishCarousel = ({ props }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlide = props[currentSlideIndex];

  const handleOrder = () => toast.success("Order Placed Successfully!");

  return (
    <div className="md:flex bg-gray-800 rounded-3xl w-full z-10">
      <div className="md:w-1/2 p-2 md:p-4">
        <Carousel slides={props} onSlideChange={setCurrentSlideIndex} />
      </div>
      <div className="p-1 md:p-3 w-full">
        <SharedCarouselContent
          slide={currentSlide}
          type="dish"
          onButtonClick={handleOrder}
          buttonText="Order"
        />
      </div>
    </div>
  );
};

export default DishCarousel;
