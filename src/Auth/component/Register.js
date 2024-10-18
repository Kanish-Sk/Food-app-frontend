import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FormButton from "../../Shared/FormElements/FormButton";
import LinkButton from "../../Shared/FormElements/LinkButton";
import Input from "../../Shared/FormElements/Input";
import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_PHONE,
  VALIDATOR_REQUIRE,
} from "../../Shared/utils/validators";
import { useForm } from "../../Shared/hooks/form-hook";
import OTPInput from "./OTPInput";

const Register = ({ toggleMode, toggleLoading }) => {
  const [enableOTP, setEnableOTP] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const [formState, inputHandler] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      phoneNumber: {
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

  const handleSendOTP = async () => {
    if (!formState.inputs.phoneNumber?.value) {
      toast.error("Please enter your phone number");
      return;
    }

    if (!formState.inputs.phoneNumber.isValid) {
      toast.error("Please enter a valid phone number");
      return;
    }

    toggleLoading();
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setEnableOTP(true);
      setResendTimer(30); // Reset timer when sending/resending OTP
      toast.success("OTP sent successfully. Test OTP: 1234");
    } catch (error) {
      toast.error("Failed to send OTP");
      console.error("Error sending OTP:", error);
    } finally {
      toggleLoading();
    }
  };

  const handleVerifyOTP = async (otp) => {
    toggleLoading();

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (otp === "1234") {
        setIsOTPVerified(true);
        toast.success("OTP verified successfully.");
      } else {
        setIsOTPVerified(false);
        toast.error("Invalid OTP");
      }
    } catch (error) {
      toast.error("OTP verification failed.");
    } finally {
      toggleLoading();
    }
  };

  useEffect(() => {
    setEnableOTP(false);
    setIsOTPVerified(false);
  }, [formState.inputs.phoneNumber.isValid]);

  useEffect(() => {
    let timer;
    if (enableOTP && resendTimer > 0) {
      console.log(resendTimer);
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [enableOTP, resendTimer]);

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
        id="phoneNumber"
        type="tel"
        name="Phone Number"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_PHONE()]}
        onInput={inputHandler}
      />
      <p
        className={`flex justify-between py-2 ${isOTPVerified ? "hidden" : ""}`}
      >
        {enableOTP && !isOTPVerified && (
          <OTPInput onComplete={handleVerifyOTP} />
        )}
        <div className="ml-auto flex items-center">
          {!enableOTP ? (
            <LinkButton onClick={handleSendOTP}>Send OTP</LinkButton>
          ) : resendTimer > 0 ? (
            <p className="text-red-500">00:{resendTimer}s</p>
          ) : (
            !isOTPVerified && (
              <LinkButton onClick={handleSendOTP}>Resend OTP</LinkButton>
            )
          )}
        </div>
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
          disabled={!formState.isValid || !isOTPVerified}
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
