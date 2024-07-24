import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../utility/context/UserContext";
import { hotelsDetails } from "../../utility/data/HomeData";
import { dishes } from "../../utility/data/DishData"; // Adjusted import to use named export
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
        // Get the dishes for the hotel and filter them based on the search query
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
    <div>
      <h1 className="text-2xl font-bold pl-2 mb-4">Search Results</h1>
      <div className="text-white px-1">
        {hotels.length > 0 || filteredDishes.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {hotels.map((hotel, index) => (
              <div className="cursor-pointer" key={index}>
                <HotelCard hotel={hotel} />
              </div>
            ))}
            {filteredDishes.map((dish, index) => (
              <div key={index}>
                <Dish dish={dish} />
              </div>
            ))}
          </div>
        ) : (
          <div>Not found</div>
        )}
      </div>
    </div>
  ) : null;
};

export default HomeSearchResult;
