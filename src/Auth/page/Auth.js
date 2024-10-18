import { useState } from "react";
import FormButton from "../../Shared/FormElements/FormButton";
import OverlayPage from "../../Shared/components/OverlayPage";
import ForgotPassword from "../component/ForgotPassword";
import Login from "../component/Login";
import OAuth from "../component/OAuth";
import Register from "../component/Register";
import LoadingOverlay from "../../Shared/components/LoadingOverLay";

const AuthPage = () => {
  const [mode, setMode] = useState("login");
  const [isLoading, setIsLoading] = useState(false);

  const toggleLoading = () => {
    setIsLoading((prev) => !prev);
  };

  const toggleMode = (newMode) => {
    setMode(newMode);
  };

  return (
    <OverlayPage glowColor={"neon-border-green"}>
      {isLoading && <LoadingOverlay />}
      <div className="flex justify-between space-x-4 mb-6 ">
        <FormButton
          onClick={() => toggleMode("login")}
          className={`text-white font-bold px-4 py-2 rounded ${
            mode === "login" ? "bg-green-600" : "bg-gray-700"
          }`}
        >
          Login
        </FormButton>
        <FormButton
          onClick={() => toggleMode("register")}
          className={`text-white font-bold px-4 py-2 rounded ${
            mode === "register" ? "bg-green-600" : "bg-gray-700"
          }`}
        >
          Register
        </FormButton>
      </div>

      {mode === "login" && <Login toggleMode={toggleMode} />}
      {mode === "register" && (
        <Register toggleMode={toggleMode} toggleLoading={toggleLoading} />
      )}
      {mode === "forgotPassword" && <ForgotPassword toggleMode={toggleMode} />}
      {mode === "login" && <OAuth />}
    </OverlayPage>
  );
};

export default AuthPage;
