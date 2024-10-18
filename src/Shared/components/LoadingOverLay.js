import React from "react";

const LoadingOverlay = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-75">
      <svg
        className="animate-spin h-12 w-12 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291l-.951.69A9.953 9.953 0 0112 a6 6 0 00-65-6v1.291z"
        ></path>
      </svg>
    </div>
  );
};

export default LoadingOverlay;
