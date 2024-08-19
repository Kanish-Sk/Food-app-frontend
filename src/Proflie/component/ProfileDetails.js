// ProfileDetails.js
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import ProfileEdit from "./ProfileEdit";
import BackDrop from "../../Shared/components/Backdrop";

const ProfileDetails = ({ profileData, setProfileData }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-800 text-gray-300 shadow-md rounded-lg p-6 w-full md:w-2/5">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <button
          onClick={handleEdit}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full flex items-center transition duration-300"
        >
          <FaEdit className="mr-2" />
          Edit
        </button>
      </div>
      <div className="">
        {Object.entries(profileData).map(([key, value]) => (
          <div className="mb-4" key={key}>
            <label className="block text-sm font-bold mb-2 text-blue-300">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <p className="bg-gray-700 p-2 rounded">{value}</p>
          </div>
        ))}
      </div>
      {isEditing && (
        <>
          <BackDrop onClick={handleCloseEdit} />
          <div className="fixed inset-0 flex items-center justify-center z-30">
            <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md max-h-screen overflow-y-auto">
              <ProfileEdit
                profileData={profileData}
                setProfileData={setProfileData}
                setIsEditing={setIsEditing}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProfileDetails;
