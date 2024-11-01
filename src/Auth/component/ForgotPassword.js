import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FormButton from "../../Shared/FormElements/FormButton";
import LinkButton from "../../Shared/FormElements/LinkButton";
import Input from "../../Shared/FormElements/Input";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
} from "../../Shared/utils/validators";
import { useForm } from "../../Shared/hooks/form-hook";
import OTPInput from "./OTPInput";

const ForgotPassword = ({ toggleLoading, toggleMode }) => {
  const [enableOTP, setEnableOTP] = useState(false);
  const [isOTPVerified, setIsOTPVerified] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  const [formState, inputHandler] = useForm(
    {
      Email: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const handleSendOTP = async () => {
    if (!formState.inputs.Email?.value) {
      toast.error("Please enter your Email Address");
      return;
    }

    if (!formState.inputs.Email.isValid) {
      toast.error("Please enter a valid Emial Address");
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
  }, [formState.inputs.Email.isValid]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState.isValid) {
      toggleMode("reset");
    } else {
      toast.error("Please enter a valid email address");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="Email"
        type="email"
        name="email"
        validators={[VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()]}
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
      <div className="text-center">
        <FormButton
          type="submit"
          disabled={!formState.isValid || !isOTPVerified}
          className="h-12 px-3 w-full text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-300"
        >
          Reset Password
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
