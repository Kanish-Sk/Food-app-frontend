import React from "react";
import { toast } from "react-toastify";
import FormButton from "../../Shared/FormElements/FormButton";
import LinkButton from "../../Shared/FormElements/LinkButton";
import Input from "../../Shared/FormElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../Shared/utils/validators";
import { useForm } from "../../Shared/hooks/form-hook";

const ForgotPassword = ({ toggleMode }) => {
  const [formState, inputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState.isValid) {
      // Here you would typically make an API call to send reset instructions
      toast.success("Password reset instructions sent to your email");
      toggleMode("login");
    } else {
      toast.error("Please enter a valid email address");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="email"
        type="email"
        name="email"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
        onInput={inputHandler}
      />
      <div className="text-center">
        <FormButton
          type="submit"
          disabled={!formState.isValid}
          className="h-12 px-3 w-full text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-300"
        >
          Send Reset Instructions
        </FormButton>
      </div>
      <p className="text-center text-sm text-gray-400">
        Remember your password?{" "}
        <LinkButton onClick={() => toggleMode("login")}>
          Back to Login
        </LinkButton>
      </p>
    </form>
  );
};

export default ForgotPassword;
