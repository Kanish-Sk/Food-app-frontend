import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Login = ({ setIsLogin, setUsername }) => {
  const [error, setError] = useState(true);
  const [mode, setMode] = useState("login"); // 'login', 'register', 'forgotPassword', 'verifyEmail'
  const [inputValues, setInputValues] = useState({
    username: "",
    password: "",
    email: "",
    verificationCode: "",
    newPassword: "",
  });
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const [isTouch, setIsTouch] = useState({
    username: false,
    password: false,
    email: false,
    verificationCode: false,
    newPassword: false,
  });

  const [stateChange, setStateChange] = useState({
    username: false,
    password: false,
    email: false,
    verificationCode: false,
    newPassword: false,
  });

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

  useEffect(() => {
    let requiredFields;
    switch (mode) {
      case "login":
        requiredFields = ["username", "password"];
        break;
      case "register":
        requiredFields = ["username", "password", "email"];
        break;
      case "forgotPassword":
        requiredFields = ["verificationCode", "newPassword"];
        break;
      default:
        requiredFields = [];
    }

    const allFieldsFilled = requiredFields.every(
      (field) => inputValues[field].trim() !== ""
    );

    const isValid =
      allFieldsFilled &&
      (mode !== "register" ||
        (isEmailVerified &&
          inputValues.username.length >= 4 &&
          inputValues.password.length >= 6));

    setError(!isValid);
  }, [inputValues, mode, isEmailVerified]);

  const handleSubmit = (e) => {
    e.preventDefault();
    switch (mode) {
      case "login":
        if (
          inputValues.username === "kanish" &&
          inputValues.password === "1234"
        ) {
          setUsername(inputValues.username);
          setIsLogin(true);
          toast.success("Logged in successfully");
        } else {
          toast.error("Invalid username or password");
        }
        break;
      case "register":
        if (inputValues.username.length < 4) {
          toast.error("Username must be at least 4 characters long");
          return;
        }
        if (inputValues.password.length < 6) {
          toast.error("Password must be at least 6 characters long");
          return;
        }
        if (!isEmailVerified) {
          toast.error("Please verify your email before registering");
          return;
        }
        toast.success("Registered successfully");
        setMode("login");
        break;
      case "forgotPassword":
        toast.success("Password reset successfully");
        setMode("login");
        break;
      default:
        break;
    }
  };

  const handleGoogle = () => {
    setUsername("Google login");
    setIsLogin(true);
    toast.success("Logged in through Google");
  };

  const handleGitHub = () => {
    setUsername("Github login");
    setIsLogin(true);
    toast.success("Logged in through GitHub");
  };

  const toggleMode = (newMode) => {
    setMode(newMode);

    setInputValues({
      username: "",
      password: "",
      email: "",
      verificationCode: "",
      newPassword: "",
    });

    setIsTouch({
      username: false,
      password: false,
      email: false,
      verificationCode: false,
      newPassword: false,
    });

    setStateChange({
      username: false,
      password: false,
      email: false,
      verificationCode: false,
      newPassword: false,
    });

    setError(true);
    setIsEmailVerified(false);
  };

  const handleVerifyEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const trimmedEmail = inputValues.email.trim();

    if (!emailRegex.test(trimmedEmail)) {
      toast.error("Invalid email format");
      return;
    }
    // Mock email verification process
    toast.info("Verification link sent to your email");
    // Simulating email verification after 2 seconds
    setTimeout(() => {
      setIsEmailVerified(true);
      toast.success("Email verified successfully");
    }, 2000);
  };

  const renderInput = (field, type = "text") => (
    <div key={field} className="relative">
      <input
        type={type}
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
        `}
        placeholder=" "
      />
      <label
        htmlFor={field}
        className={`absolute left-4 transition-all duration-300
         ${
           isTouch[field] || inputValues[field]
             ? "transform -translate-y-12 -left-3.5 text-xl scale-75 top-4"
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
    </div>
  );

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-lg p-8 shadow-2xl w-10/12 max-w-md md:w-full space-y-8">
        <div className="flex justify-center md:justify-between space-x-4 mb-5">
          <button
            className={`text-white font-bold px-4 py-2 rounded ${
              mode === "login" ? "bg-green-600" : "bg-gray-700"
            }`}
            onClick={() => toggleMode("login")}
          >
            Login
          </button>
          <button
            className={`text-white font-bold px-4 py-2 rounded ${
              mode === "register" ? "bg-green-600" : "bg-gray-700"
            }`}
            onClick={() => toggleMode("register")}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {mode === "login" && (
            <>
              {renderInput("username")}
              {renderInput("password", "password")}
              <p className="w-full flex justify-end">
                <button
                  onClick={() => toggleMode("forgotPassword")}
                  className=" text-blue-400 text-sm hover:underline"
                >
                  Forgot Password?
                </button>
              </p>
            </>
          )}

          {mode === "register" && (
            <>
              {renderInput("username")}
              {renderInput("email", "email")}
              <p className="w-full flex justify-end">
                <button
                  onClick={handleVerifyEmail}
                  type="button"
                  className={`text-blue-400 text-sm  hover:underline ${
                    isEmailVerified ? "text-green-400" : ""
                  }`}
                >
                  {isEmailVerified ? "Email Verified" : "Verify Email"}
                </button>
              </p>

              {renderInput("password", "password")}
            </>
          )}

          {mode === "forgotPassword" && (
            <>
              {renderInput("email", "email")}
              {renderInput("verificationCode")}
              {renderInput("newPassword", "password")}
            </>
          )}

          <button
            type="submit"
            className={`w-full px-4 py-3 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-300 ${
              error ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={error}
          >
            {mode === "login"
              ? "Login"
              : mode === "register"
              ? "Register"
              : mode === "forgotPassword"
              ? "Reset Password"
              : "Submit"}
          </button>
        </form>

        {mode === "login" && (
          <div>
            <div className="flex items-center w-full">
              <div className="flex-grow bg-white h-0.5"></div>
              <p className="text-white text-sm md:text-md mx-2">
                or Login with
              </p>
              <div className="flex-grow bg-white h-0.5"></div>
            </div>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={handleGoogle}
                className="w-full bg-gray-100 text-white py-2 rounded-md hover:bg-gray-300 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24"
                  height="24"
                  viewBox="0 0 48 48"
                  className="mr-2"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  ></path>
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  ></path>
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  ></path>
                </svg>
                <span className="text-lg text-gray-950 font-semibold">
                  Google
                </span>
              </button>
              <button
                onClick={handleGitHub}
                className="w-full bg-gray-100 text-white py-2 rounded-md hover:bg-gray-300 flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="24"
                  height="24"
                  viewBox="0 0 50 50"
                  className="mr-2"
                >
                  <path d="M17.791,46.836C18.502,46.53,19,45.823,19,45v-5.4c0-0.197,0.016-0.402,0.041-0.61C19.027,38.994,19.014,38.997,19,39 c0,0-3,0-3.6,0c-1.5,0-2.8-0.6-3.4-1.8c-0.7-1.3-1-3.5-2.8-4.7C8.9,32.3,9.1,32,9.7,32c0.6,0.1,1.9,0.9,2.7,2c0.9,1.1,1.8,2,3.4,2 c2.487,0,3.82-0.125,4.622-0.555C21.356,34.056,22.649,33,24,33v-0.025c-5.668-0.182-9.289-2.066-10.975-4.975 c-3.665,0.042-6.856,0.405-8.677,0.707c-0.058-0.327-0.108-0.656-0.151-0.987c1.797-0.296,4.843-0.647,8.345-0.714 c-0.112-0.276-0.209-0.559-0.291-0.849c-3.511-0.178-6.541-0.039-8.187,0.097c-0.02-0.332-0.047-0.663-0.051-0.999 c1.649-0.135,4.597-0.27,8.018-0.111c-0.079-0.5-0.13-1.011-0.13-1.543c0-1.7,0.6-3.5,1.7-5c-0.5-1.7-1.2-5.3,0.2-6.6 c2.7,0,4.6,1.3,5.5,2.1C21,13.4,22.9,13,25,13s4,0.4,5.6,1.1c0.9-0.8,2.8-2.1,5.5-2.1c1.5,1.4,0.7,5,0.2,6.6c1.1,1.5,1.7,3.2,1.6,5 c0,0.484-0.045,0.951-0.11,1.409c3.499-0.172,6.527-0.034,8.204,0.102c-0.002,0.337-0.033,0.666-0.051,0.999 c-1.671-0.138-4.775-0.28-8.359-0.089c-0.089,0.336-0.197,0.663-0.325,0.98c3.546,0.046,6.665,0.389,8.548,0.689 c-0.043,0.332-0.093,0.661-0.151,0.987c-1.912-0.306-5.171-0.664-8.879-0.682C35.112,30.873,31.557,32.75,26,32.969V33 c2.6,0,5,3.9,5,6.6V45c0,0.823,0.498,1.53,1.209,1.836C41.37,43.804,48,35.164,48,25C48,12.318,37.683,2,25,2S2,12.318,2,25 C2,35.164,8.63,43.804,17.791,46.836z"></path>
                </svg>
                <span className="text-lg text-gray-950 font-semibold">
                  GitHub
                </span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
