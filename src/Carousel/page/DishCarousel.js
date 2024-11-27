import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SharedCarouselContent from "../component/SharedCarouselContent";
import Carousel from "../component/Carousel";
import { CartContext } from "../../Shared/context/CartContext";

const DishCarousel = ({ props }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlide = props[currentSlideIndex];
  const { addToCart } = useContext(CartContext);

  console.log(props[currentSlideIndex].name);

  const handleOrder = (e) => {
    e.preventDefault();
    const orderItem = {
      ...currentSlide,
      quantity: 1,
      time: new Date().toISOString(),
    };

    toast.success(`1 ${currentSlide.name} added to the cart!`);
    addToCart(orderItem);
  };

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
          buttonText="Add to Cart"
        />
      </div>
    </div>
  );
};

export default DishCarousel;
