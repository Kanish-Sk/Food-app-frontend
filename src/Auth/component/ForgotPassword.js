import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { renderInput, useInputState } from "../../utility/hooks/UseInputRename";

const ForgotPassword = ({ toggleMode }) => {
  const inputState = useInputState({
    email: "",
  });
  const [error, setError] = useState(true);

  useEffect(() => {
    setError(inputState.inputValues.email.trim() === "");
  }, [inputState.inputValues.email]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error) {
      toast.success("Password reset instructions sent to your email");
      toggleMode("login");
    } else {
      toast.error("Please enter a valid email address");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {renderInput("email", inputState, "email")}
      <button
        type="submit"
        className={`w-full px-4 py-3 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-300 ${
          error ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={error}
      >
        Send Reset Instructions
      </button>
      <p className="text-center text-sm text-gray-400">
        Remember your password?{" "}
        <button
          type="button"
          onClick={() => toggleMode("login")}
          className="text-blue-400 hover:underline"
        >
          Back to Login
        </button>
      </p>
    </form>
  );
};

export default ForgotPassword;
