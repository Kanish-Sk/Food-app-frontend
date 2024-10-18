import { useEffect, useRef, useState } from "react";

const OTPInput = ({ onComplete }) => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    const newOtp = [...otp];
    newOtp[index] = element.value;
    setOtp(newOtp);

    //Focus next
    if (element.value !== "" && index < 3) {
      inputRefs.current[index + 1].focus();
    }

    if (index === otp.length - 1 && newOtp.every((digit) => digit !== "")) {
      if (typeof onComplete === "function") {
        onComplete(newOtp.join(""));
      } else {
        console.log("OTP completed:", newOtp.join(""));
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        // Move to the previous input when backspace is pressed and current input is empty
        if (index > 0) {
          inputRefs.current[index - 1].focus();
        }
      } else {
        // Clear the current input if it contains a value
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  return (
    <div className="flex justify-center space-x-1">
      {otp.map((_, index) => (
        <input
          key={index}
          ref={(ref) => (inputRefs.current[index] = ref)}
          type="text"
          maxLength="1"
          value={otp[index]}
          className="w-12 h-12 text-white bg-transparent text-center text-xl border-2 border-gray-500 rounded-lg focus:border-green-500 focus:outline-none"
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
};

export default OTPInput;
