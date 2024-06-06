import { useState } from "react";

const HotelCard = (hotel) => {
  const [content, setContent] = useState(false);

  const handleContent = () => {
    setContent(!content);
  };

  console.log("hotalcard", hotel.hotels.body[2]);
  return (
    <div
      onClick={handleContent}
      className="card bg-gray-800 h-56 rounded-xl overflow-hidden relative"
    >
      <img
        className="absolute w-full h-full"
        src={hotel.hotels.image}
        alt="img"
      />
      <div className="absolute top-2 left-2 flex bg-white bg-opacity-15 backdrop-blur-xl px-2 pt-1 pb-2 rounded-md text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5 mr-1 mt-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        {hotel.hotels.body[1][1]}
      </div>
      <div
        className={`absolute bottom-0 left-0 bg-white bg-opacity-15 backdrop-blur-xl text-white text-center w-full transition-all duration-500  ${
          content ? "h-4/6" : "h-1/6"
        }`}
      >
        <div className=" w-full p-2 md:p-0 flex flex-col items-center justify-between  ">
          <h1 className="font-serif text-black text-lg md:text-xl font-bold -mt-1 md:mt-1 ">
            {hotel.hotels.header}
          </h1>
          <div className="text-white font-extralight mt-1 ">
            <div className="pb-1">
              <strong>{hotel.hotels.body[2][0]}</strong>{" "}
              {hotel.hotels.body[2][1]}
            </div>
            <div>
              <strong>{hotel.hotels.body[3][0]}</strong>{" "}
              {hotel.hotels.body[3][1]}
            </div>
          </div>
          <button className=" mt-4 text-sm md:text-xs font-serif uppercase text-gray-200 font-bold bg-green-600 rounded-lg px-3 md:px-2 py-2 transition-all duration-300 hover:translate-y-[-0.25rem]">
            {hotel.hotels.button}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
