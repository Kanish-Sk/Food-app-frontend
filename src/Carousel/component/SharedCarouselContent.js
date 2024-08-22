import React from "react";
import {
  FaUtensils,
  FaClock,
  FaMapMarkerAlt,
  FaRupeeSign,
  FaHotel,
} from "react-icons/fa";

const InfoItem = ({ icon: Icon, text, color }) => (
  <div className="flex items-center p-1 md:p-2 w-full justify-center">
    <Icon className={`w-5 h-5 mr-3 text-${color}-400`} />
    <span>{text}</span>
  </div>
);

const SharedCarouselContent = ({ slide, type, onButtonClick, buttonText }) => (
  <div className="w-full p-2 md:p-4 flex flex-col items-center justify-between">
    <h1 className="font-serif text-yellow-400 text-xl md:text-2xl font-bold mb-4 md:mb-8 -mt-2 md:mt-2 text-center">
      {slide.name}
    </h1>
    <div className="text-white space-y-1 md:space-y-3 w-full max-w-md">
      {type === "hotel" ? (
        <>
          <InfoItem icon={FaUtensils} text={slide.type} color="green" />
          <InfoItem icon={FaClock} text={slide.timing} color="blue" />
          <InfoItem icon={FaMapMarkerAlt} text={slide.location} color="red" />
        </>
      ) : (
        <>
          <InfoItem
            icon={FaRupeeSign}
            text={`${slide.price}/-`}
            color="yellow"
          />
          <InfoItem icon={FaUtensils} text={slide.type} color="green" />
          <InfoItem icon={FaHotel} text={slide.hotelName} color="blue" />
        </>
      )}
    </div>
    <button
      onClick={onButtonClick}
      className="mt-3 md:mt-10 mb-2 md:mb-0 text-base md:text-lg font-serif w-fit uppercase text-white font-bold bg-gradient-to-r from-green-500 to-green-600 rounded-lg px-3 md:px-4 py-2 transition ease-in-out duration-300 hover:from-green-600 hover:to-green-700 hover:shadow-lg"
    >
      {buttonText}
    </button>
  </div>
);

export default SharedCarouselContent;
