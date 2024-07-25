import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const useInputState = (initialState) => {
  const [inputValues, setInputValues] = useState(initialState);
  const [isTouch, setIsTouch] = useState(
    Object.keys(initialState).reduce(
      (acc, key) => ({ ...acc, [key]: false }),
      {}
    )
  );
  const [stateChange, setStateChange] = useState(
    Object.keys(initialState).reduce(
      (acc, key) => ({ ...acc, [key]: false }),
      {}
    )
  );
  const [showPasswords, setShowPasswords] = useState(
    Object.keys(initialState).reduce(
      (acc, key) => ({ ...acc, [key]: false }),
      {}
    )
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputValues((prev) => ({ ...prev, [name]: value }));
    setStateChange((prev) => ({ ...prev, [name]: value.trim() === "" }));
  };

  const handleTouch = (e) => {
    const { name, value } = e.target;
    if (!isTouch[name]) {
      setIsTouch((prev) => ({ ...prev, [name]: true }));
      setStateChange((prev) => ({ ...prev, [name]: false }));
    } else {
      setStateChange((prev) => ({ ...prev, [name]: value.trim() === "" }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return {
    inputValues,
    isTouch,
    stateChange,
    showPasswords,
    handleInputChange,
    handleTouch,
    togglePasswordVisibility,
  };
};

export const renderInput = (
  field,
  {
    inputValues,
    isTouch,
    stateChange,
    showPasswords,
    handleInputChange,
    handleTouch,
    togglePasswordVisibility,
  },
  type = "text"
) => (
  <div key={field} className="relative">
    <input
      type={type === "password" && showPasswords[field] ? "text" : type}
      name={field}
      id={field}
      value={inputValues[field]}
      onFocus={handleTouch}
      onBlur={handleTouch}
      onChange={handleInputChange}
      className={`block w-full h-full px-4 py-3 text-gray-200 bg-gray-800 border-2 rounded-md focus:outline-none transition-all duration-300
        ${isTouch[field] || inputValues[field] ? "mt-10" : ""}
        ${
          isTouch[field]
            ? stateChange[field]
              ? "border-red-500"
              : "border-green-500"
            : "border-gray-600"
        }
        ${type === "password" ? "pr-10" : ""}
      `}
      placeholder=" "
    />
    <label
      htmlFor={field}
      className={`absolute left-3 transition-all duration-300
       ${
         isTouch[field] || inputValues[field]
           ? "transform -translate-y-12 ml-0 -left-4 text-xl scale-75 top-4"
           : "text-gray-400 top-3"
       } 
        ${
          isTouch[field]
            ? stateChange[field]
              ? "text-red-400"
              : "text-green-400"
            : "text-gray-400"
        }
      `}
    >
      {field.charAt(0).toUpperCase() + field.slice(1)}
    </label>
    {type === "password" && (
      <button
        type="button"
        onClick={() => togglePasswordVisibility(field)}
        className="absolute inset-y-0 right-0 pr-3 flex items-center"
      >
        {showPasswords[field] ? (
          <FaEyeSlash className="text-gray-500" />
        ) : (
          <FaEye className="text-gray-500" />
        )}
      </button>
    )}
  </div>
);
