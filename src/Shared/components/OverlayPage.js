import React from "react";

const OverlayPage = ({ children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-8 shadow-2xl w-10/12 max-w-md md:w-full space-y-8">
        {children}
      </div>
    </div>
  );
};

export default OverlayPage;
