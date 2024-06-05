import "./App.css";
import Account from "./home/component/Accout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainNavBar from "./home/page/MainNavBar";

function App() {
  return (
    <div className="p-4 relative bg-gray-200">
      <Router>
        <Routes>
          <Route path="/" element={<MainNavBar />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
