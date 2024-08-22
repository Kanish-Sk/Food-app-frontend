import React, { useEffect, useState } from "react";
import HotelCard from "../component/HotelCard";
import Loading from "../../Shared/components/Loading";
import { hotelsDetails, topDishes } from "../../Shared/data/HomeData";

import HomeSearchResult from "../component/HomeSearchResult";
import HotelCarousel from "../../Carousel/page/HotelCrousel";
import DishCarousel from "../../Carousel/page/DishCarousel";
import CategoryBar from "../../Shared/components/CategoryBar";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hotels, setHotels] = useState([]);
  const [topRatedHotels, setTopRatedHotels] = useState([]);
  const [topRateddishes, setTopRatedDishes] = useState([]);
  const [category, setCategory] = useState("All");

  const color = {
    Vegetarian: "bg-yellow-300",
    "Non-Vegetarian": "bg-red-600",
  };

  useEffect(() => {
    const fetchHotels = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));

      setTopRatedHotels(hotelsDetails);
      setTopRatedDishes(topDishes);
      setIsLoading(false);
    };

    fetchHotels();
  }, []);

  useEffect(() => {
    const categorizedHotel =
      category === "All"
        ? hotelsDetails
        : hotelsDetails.filter((hotel) => hotel.type === category);
    setHotels(categorizedHotel);
  }, [category, hotels]);

  return (
    <>
      {isLoading ? (
        <div className="text-sm md:text-base w-full h-screen flex justify-center items-center -mt-28 text-center">
          <Loading />
        </div>
      ) : (
        <>
          <HomeSearchResult />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-1 pr-0 ">
              <h1 className=" text-lg mb-2 md:text-xl md:mb-4 font-bold justify-center flex">
                Top Rated Hotels
              </h1>
              <HotelCarousel props={topRatedHotels} />
            </div>

            <div className="p-1 pr-0">
              <h1 className=" text-lg mb-2 md:text-xl md:mb-4 font-bold justify-center flex">
                Most Liked Dishes
              </h1>
              <DishCarousel props={topRateddishes} />
            </div>
          </div>
          <h1 className=" text-lg mt-3 md:mt-8 mb-2 md:text-xl md:mb-4 font-bold flex justify-center">
            Hotels
          </h1>
          <div className="ml-5 -mb-3">
            <CategoryBar
              selectedCategory={category}
              onSelectCategory={setCategory}
              categories={["Vegetarian", "Non-Vegetarian"]}
              color={color}
            />
          </div>

          <div className=" p-4 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {hotels.map((hotel, index) => (
              <div className="cursor-pointer" key={index}>
                <HotelCard hotel={hotel} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
