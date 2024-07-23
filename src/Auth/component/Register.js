import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { renderInput, useInputState } from "../../utility/hooks/UseInputRename";

const Register = ({ toggleMode }) => {
  const inputState = useInputState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(true);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    const allFieldsFilled = Object.values(inputState.inputValues).every(
      (value) => value.trim() !== ""
    );
    const isValid =
      allFieldsFilled &&
      isEmailVerified &&
      inputState.inputValues.username.length >= 4 &&
      inputState.inputValues.password.length >= 6;
    setError(!isValid);
  }, [inputState.inputValues, isEmailVerified]);

  const handleVerifyEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmedEmail = inputState.inputValues.email.trim();

    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Invalid email format");
      return;
    }
    toast.info("Verification link sent to your email");
    setTimeout(() => {
      setIsEmailVerified(true);
      toast.success("Email verified successfully");
    }, 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputState.inputValues.username.length < 4) {
      toast.error("Username must be at least 4 characters long");
      return;
    }
    if (inputState.inputValues.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    if (!isEmailVerified) {
      toast.error("Please verify your email before registering");
      return;
    }
    toast.success("Registered successfully");
    toggleMode("login");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {renderInput("username", inputState)}
      {renderInput("email", inputState, "email")}
      <p className="w-full flex justify-end">
        <button
          onClick={handleVerifyEmail}
          type="button"
          className={`text-blue-400 text-sm hover:underline ${
            isEmailVerified ? "text-green-400" : ""
          }`}
        >
          {isEmailVerified ? "Email Verified" : "Verify Email"}
        </button>
      </p>
      {renderInput("password", inputState, "password")}
      <button
        type="submit"
        className={`w-full px-4 py-3 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-300 ${
          error ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={error}
      >
        Register
      </button>
    </form>
  );
};

export default Register;
