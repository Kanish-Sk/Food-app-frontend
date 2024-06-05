import Account from "./home/component/Accout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainNavBar from "./home/page/MainNavBar";
import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`app p-4 relative ${
        darkMode ? "bg-gray-950 text-gray-200" : "bg-gray-200 text-gray-900"
      } bg-gray-200`}
    >
      <Router>
        <Routes>
          <Route
            path="/"
            element={<MainNavBar toggleDarkMode={toggleDarkMode} />}
          />
          <Route path="/account" element={<Account />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
