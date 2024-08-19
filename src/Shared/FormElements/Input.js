import { useCallback, useEffect, useReducer, useState } from "react";

import { validate } from "../utils/validators";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "SET_INPUT":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
        isStateChange: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouch: true,
      };
    default:
      return state;
  }
};

const Input = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || "",
    isValid: props.isValid || false,
    isTouch: props.isValid || false,
    isStateChange: true,
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleTouch = () => {
    dispatch({ type: "TOUCH" });
  };

  const changeHandler = useCallback(
    (e) => {
      dispatch({
        type: "SET_INPUT",
        val: e.target.value,
        validators: props.validators,
      });
    },
    [props.validators]
  );

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, onInput, value, isValid]);

  return (
    <div key={props.id} className="relative">
      <input
        id={props.id}
        type={
          props.type === "password"
            ? showPassword
              ? "text"
              : "password"
            : props.type
        }
        name={props.name}
        placeholder=""
        value={inputState.value}
        onFocus={handleTouch}
        className={`block w-full h-full px-4 py-3 text-gray-200 bg-gray-800 border-2 rounded-md focus:outline-none transition-all duration-300
          ${inputState.isTouch ? "mt-10" : ""}
          ${
            inputState.isTouch
              ? inputState.isStateChange
                ? "border-green-500"
                : "border-red-500"
              : "border-gray-600"
          }`}
        onChange={changeHandler}
      />
      <label
        htmlFor={props.name}
        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
          inputState.isTouch
            ? "transform -translate-y-12 scale-x-100 -left-1 top-4"
            : "text-gray-400 top-3"
        }
        ${
          inputState.isTouch
            ? inputState.isStateChange
              ? "text-green-400"
              : "text-red-400"
            : "text-gray-400"
        }`}
      >
        {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
      </label>
      {props.type === "password" && (
        <button
          type="button"
          onClick={() => togglePasswordVisibility()}
          className="absolute inset-y-0 right-0 pr-3 flex items-center"
        >
          {showPassword ? (
            <FaEyeSlash className="text-gray-500" />
          ) : (
            <FaEye className="text-gray-500" />
          )}
        </button>
      )}
    </div>
  );
};

export default Input;
