import React, { useContext, useEffect, useState } from "react";
import Dish from "../component/Dish";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../Shared/context/UserContext";
import { dishes } from "../../Shared/data/DishData";
import CategoryBar from "../../Shared/components/CategoryBar";
import { FaPhone, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const HotelDetails = () => {
  const { state } = useLocation();
  const hotelDetails = state.hotelDetails;
  const { searchQuery } = useContext(UserContext);
  const [category, setCategory] = useState("All");
  const [filteredDishes, setFilteredDishes] = useState([]);

  useEffect(() => {
    const hotelDishes = dishes.filter((dish) =>
      hotelDetails.dishIds.includes(dish.id)
    );

    const searchedDishes = hotelDishes.filter((dish) =>
      dish.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const categorizedDishes =
      category === "All"
        ? searchedDishes
        : searchedDishes.filter(
            (dish) => dish.category.toLowerCase() === category.toLowerCase()
          );

    setFilteredDishes(categorizedDishes);
  }, [category, searchQuery, hotelDetails.dishIds]);

  return (
    <div className="w-full min-h-screen">
      <div
        className="relative bg-center bg-cover h-80 md:h-96 bg-gradient-to-r from-cyan-400 to-purple-400 shadow-2xl"
        style={{
          backgroundImage: `url(${hotelDetails.image})`,
          boxShadow: "inset 0 -10px 20px 10px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center p-4">
          <div className="text-center text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-2 text-shadow-lg">
              {hotelDetails.name}
            </h1>
            <p className="text-2xl bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text font-semibold">
              {hotelDetails.type} Restaurant
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 shadow-xl -mt-10 relative mx-4 rounded-xl overflow-hidden border-t-4 border-gray-200">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-gray-700">
          <div className="p-6 hover:bg-gray-700 transition-colors duration-300">
            <h3 className="text-lg font-semibold mb-2 flex items-center text-cyan-400">
              <FaPhone className="mr-2" /> Contact
            </h3>
            <p className="text-gray-300">{hotelDetails.contact}</p>
          </div>
          <div className="p-6 hover:bg-gray-700 transition-colors duration-300">
            <h3 className="text-lg font-semibold mb-2 flex items-center text-purple-400">
              <FaMapMarkerAlt className="mr-2" /> Location
            </h3>
            <p className="text-gray-300">{hotelDetails.location}</p>
          </div>
          <div className="p-6 hover:bg-gray-700 transition-colors duration-300">
            <h3 className="text-lg font-semibold mb-2 flex items-center text-pink-400">
              <FaClock className="mr-2" /> Hours
            </h3>
            <p className="text-gray-300">{hotelDetails.timing}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold mb-10 text-center bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
          Our Delightful Menu
        </h2>

        <CategoryBar
          selectedCategory={category}
          onSelectCategory={setCategory}
          categories={hotelDetails.categories}
        />

        {filteredDishes.length === 0 ? (
          <p className="text-center mt-8 text-xl">
            No dishes found matching your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-8">
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
