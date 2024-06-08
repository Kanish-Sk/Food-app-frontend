import React, { useEffect, useState } from "react";
import HotelCard from "../component/HotelCard";
import Loading from "../../utility/components/Loading";
import { hotelsDetails, topDishes } from "./HomeData";
import HotelCarousel from "../../Carousel/component/HotelCrousel";
import DishCarousel from "../../Carousel/component/DishCarousel";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hotels, setHotels] = useState([]);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setHotels(hotelsDetails);
      setDishes(topDishes);
      setIsLoading(false);
    };

    fetchHotels();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="text-sm md:text-base w-full h-screen flex justify-center items-center -mt-28 text-center">
          <Loading />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-1 pr-0 ">
              <h1 className=" text-lg mb-2 md:text-xl md:mb-4 font-bold justify-center flex">
                Top Rated Hotels
              </h1>
              <HotelCarousel props={hotels} />
            </div>

            <div className="p-1 pr-0">
              <h1 className=" text-lg mb-2 md:text-xl md:mb-4 font-bold justify-center flex">
                Most Liked Dishes
              </h1>
              <DishCarousel props={dishes} />
            </div>
          </div>
          <h1 className=" text-lg mt-3 md:mt-8 mb-2 md:text-xl md:mb-4 font-bold flex justify-center">
            Hotels
          </h1>
          <div className=" p-4 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
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
