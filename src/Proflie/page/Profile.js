import React, { useState, useEffect } from "react";
import ProfileDetails from "../component/ProfileDetails";
import ConsumptionOverview from "../component/ConsumptionOverview";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [selectedTimeframe, setSelectedTimeframe] = useState("day");

  useEffect(() => {
    // Fetch profile data (mock data for this example)
    const mockData = {
      fullName: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      address: "123 Main St, City, Country",
    };
    setProfileData(mockData);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 h-screen">
      <div className="flex flex-col md:flex-row gap-8">
        <ProfileDetails
          profileData={profileData}
          setProfileData={setProfileData}
        />
        <ConsumptionOverview
          selectedTimeframe={selectedTimeframe}
          setSelectedTimeframe={setSelectedTimeframe}
        />
      </div>
    </div>
  );
};

export default Profile;
