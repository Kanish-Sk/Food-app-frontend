import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { renderInput, useInputState } from "../../utility/hooks/UseInputRename";

const Login = ({ setIsLogin, setUsername, toggleMode }) => {
  const inputState = useInputState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(true);

  useEffect(() => {
    const allFieldsFilled = Object.values(inputState.inputValues).every(
      (value) => value.trim() !== ""
    );
    setError(!allFieldsFilled);
  }, [inputState.inputValues]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      inputState.inputValues.username === "kanish" &&
      inputState.inputValues.password === "1234"
    ) {
      setUsername(inputState.inputValues.username);
      setIsLogin(true);
      toast.success("Logged in successfully");
    } else {
      toast.error("Invalid username or password");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {renderInput("username", inputState)}
      {renderInput("password", inputState, "password")}
      <p className="w-full flex justify-end">
        <button
          onClick={() => toggleMode("forgotPassword")}
          className="text-blue-400 text-sm hover:underline"
        >
          Forgot Password?
        </button>
      </p>
      <button
        type="submit"
        className={`w-full px-4 py-3 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-300 ${
          error ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={error}
      >
        Login
      </button>
    </form>
  );
};

export default Login;
