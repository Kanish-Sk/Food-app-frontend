// import { useState } from "react";
// import Login from "../component/Login";
// import Register from "../component/Register";
// import ForgotPassword from "../component/ForgotPassword";
// import OAuth from "../component/OAuth";
// import OverlayPage from "../../utility/components/OverlayPage";

import { useState } from "react";
import FormButton from "../../Shared/FormElements/FormButton";
import OverlayPage from "../../Shared/components/OverlayPage";
import ForgotPassword from "../component/ForgotPassword";
import Login from "../component/Login";
import OAuth from "../component/OAuth";
import Register from "../component/Register";

// const AuthPage = ({ setIsLogin, setUsername }) => {
//   const [mode, setMode] = useState("login");

//   const toggleMode = (newMode) => {
//     setMode(newMode);
//   };

//   return (
//     <OverlayPage>
//       <div className="flex justify-between space-x-4 mb-5">
//         <button
//           className={`text-white font-bold px-4 py-2 rounded ${
//             mode === "login" ? "bg-green-600" : "bg-gray-700"
//           }`}
//           onClick={() => toggleMode("login")}
//         >
//           Login
//         </button>
//         <button
//           className={`text-white font-bold px-4 py-2 rounded ${
//             mode === "register" ? "bg-green-600" : "bg-gray-700"
//           }`}
//           onClick={() => toggleMode("register")}
//         >
//           Register
//         </button>
//       </div>
//       {mode === "login" && (
//         <Login
//           setIsLogin={setIsLogin}
//           setUsername={setUsername}
//           toggleMode={setMode}
//         />
//       )}
//       {mode === "register" && <Register toggleMode={setMode} />}
//       {mode === "forgotPassword" && <ForgotPassword toggleMode={setMode} />}
//       {mode === "login" && (
//         <OAuth setIsLogin={setIsLogin} setUsername={setUsername} />
//       )}
//     </OverlayPage>
//   );
// };

// export default AuthPage;

const AuthPage = ({ setIsLogin, setUsername }) => {
  const [mode, setMode] = useState("login");

  const toggleMode = (newMode) => {
    setMode(newMode);
  };

  return (
    <OverlayPage>
      <div className="flex justify-between space-x-4 mb-6">
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

      {mode === "login" && (
        <Login
          setIsLogin={setIsLogin}
          setUsername={setUsername}
          toggleMode={toggleMode}
        />
      )}
      {mode === "register" && <Register toggleMode={toggleMode} />}
      {mode === "forgotPassword" && <ForgotPassword toggleMode={toggleMode} />}
      {mode === "login" && (
        <OAuth setIsLogin={setIsLogin} setUsername={setUsername} />
      )}
    </OverlayPage>
  );
};

export default AuthPage;
