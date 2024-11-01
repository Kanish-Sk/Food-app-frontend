import React from "react";
import { toast } from "react-toastify";
import FormButton from "../../Shared/FormElements/FormButton";
import Input from "../../Shared/FormElements/Input";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../Shared/utils/validators";
import { useForm } from "../../Shared/hooks/form-hook";

const ResetPassword = ({ toggleMode, toggleLoading }) => {
  const [formState, inputHandler] = useForm(
    {
      newPassword: {
        value: "",
        isValid: false,
      },
      reEnterPassword: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formState.isValid) {
      toast.error("Please fill all fields correctly");
      return;
    }

    if (
      formState.inputs.newPassword.value !==
      formState.inputs.reEnterPassword.value
    ) {
      toast.error("Passwords do not match.");
      return;
    }

    toggleLoading();
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Password changed successfully.");
      toggleMode("login");
    } catch (error) {
      console.error("Failed to change password:", error);
      toast.error("Failed to change password. Please try again.");
    } finally {
      toggleLoading();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="newPassword"
        type="password"
        name="New Password"
        validators={[
          VALIDATOR_REQUIRE(),
          VALIDATOR_MINLENGTH(6),
          VALIDATOR_MAXLENGTH(12),
        ]}
        onInput={inputHandler}
      />
      <Input
        id="reEnterPassword"
        type="password"
        name="Re-enter Password"
        validators={[
          VALIDATOR_REQUIRE(),
          VALIDATOR_MINLENGTH(6),
          VALIDATOR_MAXLENGTH(12),
        ]}
        onInput={inputHandler}
      />
      <div className="text-center">
        <FormButton
          type="submit"
          disabled={!formState.isValid}
          className="h-12 px-3 w-full text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-300"
        >
          Reset Password
        </FormButton>
      </div>
    </form>
  );
};

export default ResetPassword;
