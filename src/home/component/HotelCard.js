import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  const [content, setContent] = useState(false);
  const navigate = useNavigate();

  const handleContent = () => {
    setContent(!content);
  };

  const handleViewHotel = () => {
    navigate(`${hotel.name}/dishes`, { state: { hotelDetails: hotel } });
  };

  return (
    <div
      onClick={handleContent}
      className="h-56 rounded-xl overflow-hidden relative"
    >
      <img className="absolute w-full h-full" src={hotel.image} alt="img" />
      <div className="absolute top-2 left-2 flex items-center bg-white bg-opacity-15 backdrop-blur-xl px-2 py-1 rounded-md text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-3 md:size-5 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <div className="text-xs md:text-base">{hotel.timing}</div>
      </div>
      <div
        className={`absolute bottom-0 left-0 bg-white bg-opacity-15 backdrop-blur-xl text-white text-center w-full transition-all duration-300  ${
          content ? "h-4/6" : "h-1/6"
        }`}
      >
        <div className=" w-full p-2 md:p-0 flex flex-col items-center justify-between  ">
          <h1 className="font-serif text-black text-xs md:text-xl font-bold mt-1 md:mt-1 ">
            {hotel.name}
          </h1>
          <div className="text-white text-sm md:text-base font-medium mt-1">
            <div className="mb-1 font-extralight">{hotel.type}</div>
            <div className="font-extralight">{hotel.contact}</div>
          </div>
          <button
            onClick={handleViewHotel}
            className=" mt-4 text-xs font-serif uppercase text-gray-200 font-bold bg-green-600 rounded-lg px-3 md:px-2 py-2 transition-all duration-300 hover:translate-y-[-0.25rem]"
          >
            view
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
