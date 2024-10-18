import React from "react";

const OverlayPage = ({ children, glowColor = "neon-border-red" }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className={`bg-gray-900 neon-border ${glowColor}  p-8 shadow-2xl w-10/12 max-w-md md:w-full space-y-8 rounded-lg`}
      >
        {children}
      </div>
    </div>
  );
};

export default OverlayPage;
