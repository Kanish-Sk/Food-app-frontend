import React from "react";
import Dish from "../component/Dish";
import { useLocation } from "react-router-dom";

const HotelDetails = () => {
  const hotelDetails = useLocation().state.hotelDetails;

  console.log("hoteldetails", hotelDetails);

  return (
    <div className="w-full h-screen p-1">
      <div className="h-screen">
        <h1 className="flex items-center justify-center text-2xl font-bold mb-2">
          {hotelDetails.name}
        </h1>
        <div className="border-2 h-full border-red-700 grid grid-cols-2 gap-4 md:gap-7 md:grid-cols-4 p-0 md:p-5">
          {hotelDetails.dishes.map((dish, index) => (
            <div key={index}>
              <Dish key={dish.id} dish={dish} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
