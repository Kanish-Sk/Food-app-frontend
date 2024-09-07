import React, { useState, useEffect, useContext } from "react";
import { userData } from "../../Shared/data/UserData";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ProfileDetails from "../component/ProfileDetail";
import OrderAnsStats from "../component/OrdersAndStats";
import { UserContext } from "../../Shared/context/UserContext";

ChartJS.register(ArcElement, Tooltip, Legend);

const Profile = () => {
  const { username } = useContext(UserContext);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const currentUser = userData.find((user) => user.username === username);
    if (currentUser) {
      setProfileData(currentUser);
    } else {
      setProfileData({
        username: "John Doe",
        email: "johndoe@example.com",
        location: "New York",
        amount: 3000,
        budget: 5000,
        password: "1234",
      });
    }
  }, [username]);

  const handleSave = (updatedData) => {
    console.log(updatedData);
    setProfileData(updatedData);
  };

  return (
    <div className="container mx-auto px-2 py-2 pb-6 text-white">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/3">
          {profileData ? (
            <ProfileDetails profileData={profileData} onSave={handleSave} />
          ) : (
            <p>Loading profile...</p>
          )}
        </div>
        <div className="w-full md:w-2/3">
          <OrderAnsStats totalAmount={profileData?.budget} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
