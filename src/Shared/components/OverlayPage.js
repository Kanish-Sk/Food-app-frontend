import React from "react";

const OverlayPage = ({
  children,
  glowColor = "neon-border-red",
  icon = null,
  toggleCard = null,
  mode = null,
}) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
      <button
        className={`bg-gray-900 w-14 h-14 flex items-center justify-center rounded-full mb-5 ${
          mode !== ("resetPassword", "forgotPassword") ? glowColor : null
        }`}
        onClick={toggleCard}
        disabled={mode === ("resetPassword", "forgotPassword")}
      >
        {icon}
      </button>
      <div
        className={`bg-gray-900 neon-border ${glowColor}  p-8 shadow-2xl w-10/12 max-w-md md:w-full space-y-8 rounded-lg`}
      >
        {children}
      </div>
    </div>
  );
};

export default OverlayPage;
