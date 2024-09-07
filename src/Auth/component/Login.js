import React, { useContext } from "react";
import { toast } from "react-toastify";
import FormButton from "../../Shared/FormElements/FormButton";
import LinkButton from "../../Shared/FormElements/LinkButton";
import Input from "../../Shared/FormElements/Input";
import { VALIDATOR_REQUIRE } from "../../Shared/utils/validators";
import { useForm } from "../../Shared/hooks/form-hook";
import { userData } from "../../Shared/data/UserData";
import { UserContext } from "../../Shared/context/UserContext";

const Login = ({ toggleMode }) => {
  const { setUsername, setDarkMode, setIsLogin } = useContext(UserContext);
  const [formState, inputHandler] = useForm(
    {
      username: {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState.isValid) {
      console.log(formState.inputs);

      const founduser = userData.find(
        (user) =>
          formState.inputs.username.value === user.username &&
          formState.inputs.password.value === user.password
      );

      if (founduser) {
        setUsername(founduser.username);
        setDarkMode(founduser.darkMode);
        setIsLogin(true);
        toast.success("Logged in successfully");
      } else {
        toast.error("Invalid username or password");
      }
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
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
      />
      <Input
        id="password"
        type="password"
        name="password"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
      />
      <p className="flex justify-end py-2">
        <LinkButton onClick={() => toggleMode("forgotPassword")}>
          Forgot Password?
        </LinkButton>
      </p>
      <div className="text-center">
        <FormButton
          type="submit"
          disabled={!formState.isValid}
          className="h-12 px-3 w-full text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-300"
        >
          Login
        </FormButton>
      </div>
    </form>
  );
};

export default Login;
