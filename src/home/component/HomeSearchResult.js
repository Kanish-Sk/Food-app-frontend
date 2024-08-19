import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Shared/context/UserContext";
import { hotelsDetails } from "../../Shared/data/HomeData";
import { dishes } from "../../Shared/data/DishData";
import HotelCard from "./HotelCard";
import Dish from "../../hotel/component/Dish";

const HomeSearchResult = () => {
  const { searchQuery } = useContext(UserContext);
  const [hotels, setHotels] = useState([]);
  const [filteredDishes, setFilteredDishes] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      // Filter hotels based on search query
      const filteredHotels = hotelsDetails.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hotel.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hotel.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hotel.owner.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setHotels(filteredHotels);

      // Create a map of dish IDs to dish objects
      const dishMap = dishes.reduce((map, dish) => {
        map[dish.id] = dish;
        return map;
      }, {});

      // Filter dishes based on search query
      const filteredDishes = hotelsDetails.reduce((acc, hotel) => {
        const dishesForHotel = hotel.dishIds
          .map((id) => dishMap[id])
          .filter((dish) =>
            dish.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
        acc.push(...dishesForHotel);
        return acc;
      }, []);

      setFilteredDishes(filteredDishes);
    } else {
      setHotels([]);
      setFilteredDishes([]);
    }
  }, [searchQuery]);

  return searchQuery.length > 0 ? (
    <div className="px-2">
      <h1 className="text-lg md:text-xl font-bold mb-4">Search Results</h1>
      {hotels.length > 0 || filteredDishes.length > 0 ? (
        <div className="overflow-x-auto">
          <div className="flex space-x-4 pb-4 ">
            {hotels.map((hotel, index) => (
              <div key={index} className="w-full md:w-1/4 flex-shrink-0">
                <HotelCard hotel={hotel} />
              </div>
            ))}
            {filteredDishes.map((dish, index) => (
              <div key={index} className="w-full md:w-1/4 flex-shrink-0">
                <Dish dish={dish} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-white">Not found</div>
      )}
    </div>
  ) : null;
};

export default HomeSearchResult;
