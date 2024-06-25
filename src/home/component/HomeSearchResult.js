import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../utility/context/UserContext";
import { hotelsDetails } from "../page/HomeData";
import HotelCard from "./HotelCard";
import Dish from "./Dish";

const HomeSearchResult = () => {
  const { searchQuery } = useContext(UserContext);
  const [hotels, setHotels] = useState([]);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    if (searchQuery) {
      const filteredHotels = hotelsDetails.filter(
        (hotel) =>
          hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hotel.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hotel.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          hotel.owner.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setHotels(filteredHotels);

      const filteredDishes = hotelsDetails
        .reduce((acc, hotel) => {
          acc.push(...hotel.dishes);
          return acc;
        }, [])
        .filter((dish) =>
          dish.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
      setDishes(filteredDishes);
    } else {
      setHotels([]);
      setDishes([]);
    }
  }, [searchQuery]);

  return searchQuery.length > 0 ? (
    <div>
      <h1 className="text-2xl font-bold pl-2 mb-4">Search Results</h1>
      <div className="text-white px-1">
        {hotels.length > 0 || dishes.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {hotels.map((hotel, index) => (
              <div className="cursor-pointer" key={index}>
                <HotelCard hotel={hotel} />
              </div>
            ))}
            {dishes.map((dish, index) => (
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
