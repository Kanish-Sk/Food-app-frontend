const DateRangePicker = (props) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:gap-4">
      <label
        htmlFor={props.dateLabel.toLowerCase()}
        className="text-sm md:text-lg mb-1 font-bold"
      >
        {props.dateLabel}
      </label>
      <input
        id={props.dateLabel.toLowerCase()}
        type="date"
        onChange={(e) => props.handleDateChange(e.target.value)}
        className="border text-black border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-semibold text-xs md:text-sm  h-6 md:h-8"
      />
    </div>
  );
};

export default DateRangePicker;
