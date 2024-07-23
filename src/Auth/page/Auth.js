import { useState } from "react";
import Login from "../component/Login";
import Register from "../component/Register";
import ForgotPassword from "../component/ForgotPassword";
import OAuth from "../component/OAuth";

const AuthPage = ({ setIsLogin, setUsername }) => {
  const [mode, setMode] = useState("login");

  const toggleMode = (newMode) => {
    setMode(newMode);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-8 shadow-2xl w-10/12 max-w-md md:w-full space-y-8">
        <div className="flex justify-between space-x-4 mb-5">
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

        {mode === "login" && (
          <Login
            setIsLogin={setIsLogin}
            setUsername={setUsername}
            toggleMode={toggleMode}
          />
        )}
        {mode === "register" && <Register toggleMode={toggleMode} />}
        {mode === "forgotPassword" && (
          <ForgotPassword toggleMode={toggleMode} />
        )}

        {mode === "login" && (
          <OAuth setIsLogin={setIsLogin} setUsername={setUsername} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
