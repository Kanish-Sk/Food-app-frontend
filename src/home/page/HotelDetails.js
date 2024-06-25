import React, { useContext, useEffect, useState } from "react";
import Dish from "../component/Dish";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../utility/context/UserContext";

const HotelDetails = () => {
  const hotelDetails = useLocation().state.hotelDetails;
  const { searchQuery } = useContext(UserContext);
  const [filteredDishes, setFilteredDishes] = useState(hotelDetails.dishes);

  useEffect(() => {
    setFilteredDishes(
      hotelDetails.dishes.filter((dish) =>
        dish.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [hotelDetails.dishes, searchQuery]);

  return (
    <div className="w-full min-h-screen ">
      <div
        className="relative bg-center bg-cover h-48 sm:h-64 md:h-80"
        style={{ backgroundImage: `url(${hotelDetails.image})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="text-center text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4">
              {hotelDetails.name}
            </h1>
            <p className="text-lg sm:text-xl">{hotelDetails.type} Restaurant</p>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-md -mt-6 relative z-10 mx-4 rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
          <div className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold mb-2">Contact</h3>
            <p className="text-gray-600">{hotelDetails.contact}</p>
          </div>
          <div className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold mb-2">Location</h3>
            <p className="text-gray-600">{hotelDetails.location}</p>
          </div>
          <div className="p-4 sm:p-6">
            <h3 className="text-lg font-semibold mb-2">Hours</h3>
            <p className="text-gray-600">{hotelDetails.timing}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
          Our Menu
        </h2>

        {filteredDishes.length === 0 ? (
          <p className="text-center text-gray-500">
            No dishes found matching your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredDishes.map((dish) => (
              <Dish key={dish.id} dish={dish} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelDetails;
