import React, { useState } from "react";
import Carousel from "./carousel";
import CarosuelSideData from "./CarouselSideData";

const CarouselWrapper = ({ props }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  const updateCurrentSlideIndex = (index) => {
    setCurrentSlideIndex(index);
  };

  const currentSlide = props[currentSlideIndex];

  console.log(currentSlide.body[1]);

  return (
    <div className="md:flex bg-gray-800 rounded-3xl w-full ">
      <div className=" md:w-1/2 p-4">
        <Carousel slides={props} onSlideChange={updateCurrentSlideIndex} />
      </div>
      <div className="p-1 md:p-3 w-full">
        <CarosuelSideData currentSlide={currentSlide} />
      </div>
    </div>
  );
};

export default CarouselWrapper;
