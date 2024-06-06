import image1 from "../component/assets/food1.jpeg";
import image2 from "../component/assets/food2.jpg";
import image3 from "../component/assets/food3.jpg";
import Carouselwrapper from "../component/CarouselWrapper";
import HotelCard from "../component/HotelCard";

const Home = () => {
  const hotels = [
    {
      image: image1,
      header: "KFC",
      body: {
        1: ["Timing : ", "8am-9am"],
        2: ["Type : ", "Fast Food"],
        3: ["Rating : ", "4/5"],
      },
      button: "View",
    },
    {
      image: image2,
      header: "McDonald's",
      body: {
        1: ["Timing : ", "7am-9am"],
        2: ["Type : ", "Fast Food"],
        3: ["Rating : ", "3/5"],
      },
      button: "View",
    },
    {
      image: image3,
      header: "Olive Garden",
      body: {
        1: ["Timing : ", "9am-11am"],
        2: ["Type : ", "Casual Dining"],
        3: ["Rating : ", "5/5"],
      },
      button: "View",
    },
  ];

  const dishes = [
    {
      image: image1,
      header: "Biryani",
      body: {
        1: ["Hotel Name :", "Salem RR Biryani"],
        2: ["Type :", "Veg & Non-veg"],
        3: ["Duration :", 25],
      },
      button: "Order",
    },
    {
      image: image2,
      header: "Pizza",
      body: {
        1: ["Hotel Name :", "Domino's"],
        2: ["Type :", "Veg & Non-veg"],
        3: ["Duration :", 25],
      },
      button: "Order",
    },
    {
      image: image3,
      header: "Pasta",
      body: {
        1: ["Hotel Name :", "Olive Garden"],
        2: ["Type :", "Veg"],
        3: ["Duration :", 20],
      },
      button: "Order",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-1 pr-0 ">
          <h1 className=" text-lg mb-2 md:text-xl md:mb-4 font-bold justify-center flex">
            Top Rated Hotels
          </h1>
          <Carouselwrapper props={hotels} />
        </div>

        <div className="p-1 pr-0">
          <h1 className=" text-lg mb-2 md:text-xl md:mb-4 font-bold justify-center flex">
            Mosted Liked Dishes
          </h1>
          <Carouselwrapper props={dishes} />
        </div>
      </div>
      <h1 className=" text-lg mt-3 md:mt-8 mb-2 md:text-xl md:mb-4 font-bold flex justify-center">
        Hotels
      </h1>
      <div className=" p-4 grid grid-cols-2 md:grid-cols-4 gap-6">
        {Object.entries(hotels).map(([key, value]) => (
          <div className="cursor-pointer " key={key}>
            <HotelCard hotels={value} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Home;
