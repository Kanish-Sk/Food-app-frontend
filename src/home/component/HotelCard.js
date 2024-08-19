import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaClock, FaUtensils, FaPhoneAlt, FaEye } from "react-icons/fa";

const HotelCard = ({ hotel }) => {
  const [expanded, setExpanded] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const navigate = useNavigate();

  const handleExpand = useCallback(() => {
    setExpanded((prevExpanded) => !prevExpanded);
  }, []);

  const handleViewHotel = useCallback(
    (e) => {
      e.stopPropagation();
      navigate(`${hotel.name}/dishes`, { state: { hotelDetails: hotel } });
    },
    [navigate, hotel]
  );

  const handleFailedImage = useCallback(() => {
    setImageFailed(true);
  }, []);

  const handleLoadedImage = useCallback(() => {
    setImageFailed(false);
  }, []);

  return (
    <div
      className={`card-container h-72 md:h-80 rounded-2xl overflow-hidden relative ${
        imageFailed ? "border-2 border-gray-300" : ""
      } shadow-lg transition-all duration-300 hover:shadow-2xl cursor-pointer group`}
      onClick={handleExpand}
    >
      <img
        src={hotel.image}
        alt={hotel.name}
        className={`h-full w-full object-cover transition-all duration-500 ${
          expanded
            ? "filter blur-sm scale-110 brightness-50"
            : "group-hover:scale-105"
        }`}
        onLoad={handleLoadedImage}
        onError={handleFailedImage}
      />
      <div className="absolute top-3 left-3 bg-white bg-opacity-75 backdrop-blur-xl px-3 py-1 rounded-full text-xs font-semibold text-gray-800 shadow-md flex items-center">
        <FaClock className="mr-2 text-blue-500" />
        {hotel.timing}
      </div>
      {expanded ? (
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-800/90 flex flex-col items-center justify-center text-white p-6">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-yellow-300 flex items-center">
            {hotel.name}
          </h3>
          <div className="w-full max-w-xs space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm flex items-center">
                <FaUtensils className="mr-2 text-pink-400" /> Type
              </span>
              <span className="text-sm text-pink-400">{hotel.type}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm flex items-center">
                <FaPhoneAlt className="mr-2 text-green-400" /> Contact
              </span>
              <span className="text-sm text-green-400">{hotel.contact}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300 text-sm flex items-center">
                <FaClock className="mr-2 text-blue-400" /> Timing
              </span>
              <span className="text-sm text-blue-400">{hotel.timing}</span>
            </div>
          </div>
          <button
            onClick={handleViewHotel}
            className="w-full max-w-xs mt-6 bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white font-bold py-3 px-4 rounded-lg text-sm transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
          >
            <FaEye className="mr-2" /> View Menu
          </button>
        </div>
      ) : (
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-900 to-transparent p-4 sm:p-6">
          <h2 className="text-yellow-300 text-lg sm:text-xl md:text-2xl font-bold mb-2">
            {hotel.name}
          </h2>
          <div className="flex justify-between items-center">
            <span className="text-gray-300 text-sm sm:text-base flex items-center">
              <FaUtensils className="mr-2 text-pink-400" /> {hotel.type}
            </span>
            <span className="text-gray-300 text-sm sm:text-base flex items-center">
              <FaPhoneAlt className="mr-2 text-green-400" /> {hotel.contact}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default HotelCard;
