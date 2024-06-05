import Carousel from "../component/carousel";
import image1 from "../component/assets/food1.jpeg";
import image2 from "../component/assets/food2.jpg";
import image3 from "../component/assets/food3.jpg";
import Carouselwrapper from "../component/CarouselWrapper";

const imgs = [image1, image2, image3];

const Home = () => {
  const hotels = [
    {
      image: image1,
      header: "KFC",
      body: {
        1: ["Owner : ", "Yum! Brands"],
        2: ["Type : ", "Fast Food"],
        3: ["Rating : ", "8/10"],
      },
      button: "View",
    },
    {
      image: image2,
      header: "McDonald's",
      body: {
        1: ["Owner : ", "McDonald's Corporation"],
        2: ["Type : ", "Fast Food"],
        3: ["Rating : ", "9/10"],
      },
      button: "View",
    },
    {
      image: image3,
      header: "Olive Garden",
      body: {
        1: ["Owner : ", "Darden Restaurants"],
        2: ["Type : ", "Casual Dining"],
        3: ["Rating : ", "7.5/10"],
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-2 pr-0">
        <h1 className="text-gray-900 text-xl font-bold mb-4 justify-center flex">
          Top Rated Hotels
        </h1>
        <Carouselwrapper props={hotels} />
      </div>

      <div className="p-2 pr-0">
        <h1 className="text-gray-900 text-xl font-bold mb-4 justify-center flex">
          Mosted Liked Dishes
        </h1>
        <Carouselwrapper props={dishes} />
      </div>
    </div>
  );
};

export default Home;
