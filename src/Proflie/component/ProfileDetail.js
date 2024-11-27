import React, { useContext, useState } from "react";
import { FaToggleOn, FaToggleOff } from "react-icons/fa";
import { useForm } from "../../Shared/hooks/form-hook";
import Input from "../../Shared/FormElements/Input";
import { UserContext } from "../../Shared/context/UserContext";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MIN,
  VALIDATOR_REQUIRE,
} from "../../Shared/utils/validators";
import FormButton from "../../Shared/FormElements/FormButton";
import { toast } from "react-toastify";

const ProfileDetails = ({ profileData, onSave }) => {
  const { darkModeEditPermission, setDarkModeEditPermission } =
    useContext(UserContext);
  const [isEditing, setIsEditing] = useState(false);

  const [formState, inputHandler] = useForm(
    {
      username: { value: profileData.username || "", isValid: true },
      email: { value: profileData.email || "", isValid: true },
      location: { value: profileData.location || "", isValid: true },
      budget: { value: profileData.budget || "", isValid: true },
      password: { value: profileData.password || "", isValid: true },
    },
    true
  );

  const handleSave = (event) => {
    event.preventDefault();
    if (formState.isValid) {
      onSave(formState.inputs);
      toast.success("Profile updated Sucessfully.");
    }
    setIsEditing(false);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg relative">
      <h2 className="text-xl sm:text-2xl text-center font-bold mb-4 text-white">
        Profile Details
      </h2>
      <form onSubmit={handleSave} className="space-y-3 sm:space-y-4">
        <Input
          id="username"
          type="text"
          name="username"
          label="Username"
          value={formState.inputs.username.value}
          onInput={inputHandler}
          isValid={true}
          validators={[VALIDATOR_REQUIRE()]}
          disabled={!isEditing}
        />
        <Input
          id="email"
          type="email"
          name="email"
          label="Email"
          value={formState.inputs.email.value}
          onInput={inputHandler}
          isValid={true}
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
          disabled={!isEditing}
        />
        <Input
          id="location"
          type="text"
          name="Location"
          label="Location"
          value={formState.inputs.location.value}
          onInput={inputHandler}
          isValid={true}
          validators={[VALIDATOR_REQUIRE()]}
          disabled={!isEditing}
        />
        <Input
          id="budget"
          type="number"
          name="budget"
          label="Budget"
          value={formState.inputs?.budget?.value}
          onInput={inputHandler}
          isValid={true}
          validators={[VALIDATOR_REQUIRE(), VALIDATOR_MIN(0)]}
          disabled={!isEditing}
        />
        <Input
          id="password"
          type="password"
          name="password"
          label="Password"
          value={formState.inputs.password.value}
          onInput={inputHandler}
          isValid={true}
          validators={[VALIDATOR_REQUIRE()]}
          disabled={!isEditing}
        />
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <span className="text-white text-sm sm:text-base">
            Dark Mode Edit Permission
          </span>
          <button
            type="button"
            disabled={!isEditing}
            onClick={() => setDarkModeEditPermission(!darkModeEditPermission)}
            className={`${!isEditing ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {darkModeEditPermission ? (
              <FaToggleOn
                size={20}
                className={isEditing ? "text-green-500" : "text-gray-500 "}
              />
            ) : (
              <FaToggleOff
                size={20}
                className={isEditing ? "text-red-500" : "text-gray-500"}
              />
            )}
          </button>
        </div>
        <FormButton
          type="button"
          onClick={isEditing ? handleSave : toggleEdit}
          disabled={!formState.isValid}
          className={`h-10 sm:h-12 px-2 sm:px-3 w-full text-white rounded-md ${
            !formState.isValid ? "opacity-50 cursor-not-allowed" : ""
          } ${
            isEditing
              ? "bg-green-600 hover:bg-green-700 focus:ring-green-500"
              : "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500"
          }`}
        >
          {isEditing ? "Save" : "Edit"}
        </FormButton>
      </form>
    </div>
  );
};

export default ProfileDetails;
