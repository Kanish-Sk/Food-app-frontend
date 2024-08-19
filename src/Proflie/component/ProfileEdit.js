// EditProfile.js
import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaSave, FaTimes } from "react-icons/fa";

const EditProfile = ({ profileData, setProfileData, setIsEditing }) => {
  const [editData, setEditData] = useState({ ...profileData });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProfileData(editData);
    setIsEditing(false);
    toast.success("Profile updated successfully!");
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-blue-300">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(editData).map(([key, value]) => (
          <div className="mb-4" key={key}>
            <label className="block text-sm font-bold mb-2 text-blue-300">
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </label>
            <input
              type="text"
              name={key}
              value={value}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded"
            />
          </div>
        ))}
        <div className="flex justify-end mt-6">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full mr-4 flex items-center transition duration-300"
          >
            <FaTimes className="mr-2" />
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full flex items-center transition duration-300"
          >
            <FaSave className="mr-2" />
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
