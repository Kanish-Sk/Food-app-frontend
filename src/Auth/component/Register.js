import React, { useState } from "react";
import { toast } from "react-toastify";
import FormButton from "../../Shared/FormElements/FormButton";
import LinkButton from "../../Shared/FormElements/LinkButton";
import Input from "../../Shared/FormElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../Shared/utils/validators";
import { useForm } from "../../Shared/hooks/form-hook";

const Register = ({ toggleMode }) => {
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const [formState, inputHandler] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const handleEmailVerification = () => {
    if (formState.inputs.email.isValid) {
      setIsEmailVerified(true);
      toast.success("Email verification link sent to your email.");
    } else {
      setIsEmailVerified(false);
      toast.error("Invalid email address.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState.isValid) {
      console.log(formState.inputs);
      toast.success("Registered successfully");
      toggleMode("login");
    } else {
      toast.error("Please fill all fields correctly");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="username"
        type="username"
        name="username"
        validators={[
          VALIDATOR_REQUIRE(),
          VALIDATOR_MINLENGTH(3),
          VALIDATOR_MAXLENGTH(8),
        ]}
        onInput={inputHandler}
      />

      <Input
        id="email"
        type="email"
        name="email"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
        onInput={inputHandler}
      />
      <p className="flex justify-end py-2">
        <LinkButton onClick={() => handleEmailVerification()}>
          {isEmailVerified ? "Email Verified" : "Verify Email"}
        </LinkButton>
      </p>
      <Input
        id="password"
        type="password"
        name="password"
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
          disabled={!formState.isValid || !isEmailVerified}
          className="h-12 px-3 w-full text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-300"
        >
          Register
        </FormButton>
      </div>
      <p className="text-center text-sm text-gray-400">
        Already have an account?{" "}
        <LinkButton onClick={() => toggleMode("login")}>Login</LinkButton>
      </p>
    </form>
  );
};

export default Register;
