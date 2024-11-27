import { FaCheck, FaTimes, FaTrash, FaShoppingCart } from "react-icons/fa";

const ConfirmationOverlay = ({
  type = "delete",
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = "Confirm",
  cancelText = "Cancel",
}) => {
  // Select icon based on type
  const IconComponent = {
    delete: FaTrash,
    order: FaShoppingCart,
  }[type];

  // Select color based on type
  const iconColors = {
    delete: "text-red-500",
    order: "text-green-500",
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-xl shadow-2xl w-full max-w-md p-6 text-center">
        <div className="mb-4">
          <IconComponent
            className={`mx-auto text-4xl ${iconColors[type]} mb-4`}
          />
          <h2 className="text-xl font-bold text-yellow-300 mb-2">{title}</h2>
          <p className="text-gray-300 mb-6">{message}</p>
        </div>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition flex items-center"
          >
            <FaCheck className="mr-2" /> {confirmText}
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition flex items-center"
          >
            <FaTimes className="mr-2" /> {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationOverlay;
