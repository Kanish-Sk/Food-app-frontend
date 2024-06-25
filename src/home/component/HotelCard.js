import { useState } from "react";
import { useNavigate } from "react-router-dom";

const HotelCard = ({ hotel }) => {
  const [content, setContent] = useState(false);
  const navigate = useNavigate();

  const handleContent = () => {
    setContent(!content);
  };

  const handleViewHotel = (e) => {
    e.stopPropagation();
    navigate(`${hotel.name}/dishes`, { state: { hotelDetails: hotel } });
  };

  return (
    <div
      onClick={handleContent}
      className="h-48 sm:h-56 md:h-64 rounded-xl overflow-hidden relative"
    >
      <img
        className="absolute w-full h-full object-cover"
        src={hotel.image}
        alt={hotel.name}
      />
      <div className="absolute top-2 left-2 flex items-center bg-white bg-opacity-15 backdrop-blur-xl px-2 py-1 rounded-md text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 mr-1"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <div className="text-xs sm:text-sm md:text-base">{hotel.timing}</div>
      </div>
      <div
        className={`absolute bottom-0 left-0 bg-white bg-opacity-15 backdrop-blur-xl text-white text-center w-full transition-all duration-300 ${
          content ? "h-4/6" : "h-1/6"
        }`}
      >
        <div className="w-full p-2 flex flex-col items-center justify-between h-full">
          <h1 className="font-serif text-black text-xs sm:text-sm md:text-xl font-bold">
            {hotel.name}
          </h1>
          <div className="text-white text-xs sm:text-sm md:text-base font-medium mt-1">
            <div className="mb-1 font-extralight">{hotel.type}</div>
            <div className="font-extralight">{hotel.contact}</div>
          </div>
          <button
            onClick={handleViewHotel}
            className="mt-2 sm:mt-4 text-xs sm:text-sm font-serif uppercase text-gray-200 font-bold bg-green-600 rounded-lg px-3 py-1 sm:py-2 transition-all duration-300 hover:translate-y-[-0.25rem]"
          >
            view
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCard;
