const CarosuelSideData = ({ currentSlide }) => {
  return (
    <div className=" w-full p-4 flex flex-col items-center justify-between">
      <h1 className="uppercase text-yellow-500 text-2xl font-bold md:mt-2">
        {currentSlide.header}
      </h1>
      <div className="text-white font-bold mt-4">
        {Object.keys(currentSlide.body).map((key) => (
          <div key={key} className="p-4">
            <strong>{currentSlide.body[key][0]}</strong>{" "}
            {currentSlide.body[key][1]}
          </div>
        ))}
      </div>
      <button className=" mt-10  uppercase text-gray-200 font-bold bg-yellow-400 rounded-lg px-4 py-2 hover:shadow-xl hover:shadow-black transition ease-in-out duration-200">
        {currentSlide.button}
      </button>
    </div>
  );
};

export default CarosuelSideData;
