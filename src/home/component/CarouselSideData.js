const CarosuelSideData = ({ currentSlide }) => {
  return (
    <div className=" w-full p-2 md:p-4 flex flex-col items-center justify-between  ">
      <h1 className="font-serif text-green-600 text-lg md:text-2xl font-bold -mt-2 md:mt-2">
        {currentSlide.header}
      </h1>
      <div className="text-white font-extralight mt-1 md:mt-4">
        {Object.keys(currentSlide.body).map((key) => (
          <div key={key} className="p-1 md:p-4">
            <strong>{currentSlide.body[key][0]}</strong>{" "}
            {currentSlide.body[key][1]}
          </div>
        ))}
      </div>
      <button className=" mt-3 md:mt-10 text-sm md:text-base font-serif uppercase text-gray-200 font-bold bg-green-600 rounded-lg px-3 md:px-4 py-2 hover:shadow-xl hover:shadow-black transition ease-in-out duration-200">
        {currentSlide.button}
      </button>
    </div>
  );
};

export default CarosuelSideData;
