import { useCallback, useContext, useState, useEffect } from "react";
import {
  FaCalendarAlt,
  FaHotel,
  FaMinus,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import ConfirmationOverlay from "./ConfirmationOverlay";
import { toast } from "react-toastify";
import { CartContext } from "../../Shared/context/CartContext";

const CartCard = ({ dish }) => {
  const [quantity, setQuantity] = useState(dish.quantity);
  const [totalCost, setTotalCost] = useState(dish.price * dish.quantity);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const { updateQuantity, removeFromCart } = useContext(CartContext);

  // Sync local state with context when dish prop changes
  useEffect(() => {
    setQuantity(dish.quantity);
    setTotalCost(dish.price * dish.quantity);
  }, [dish.quantity, dish.price]);

  const handleIncrement = useCallback(() => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    setTotalCost(newQuantity * dish.price);
    updateQuantity(dish.id, newQuantity);
  }, [dish.id, dish.price, quantity, updateQuantity]);

  const handleDecrement = useCallback(() => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQuantity);
    setTotalCost(newQuantity * dish.price);
    updateQuantity(dish.id, newQuantity);
  }, [dish.id, dish.price, quantity, updateQuantity]);

  const onDelete = () => {
    removeFromCart(dish.id);
    toast.success("Item has been deleted");
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      {showDeleteConfirmation && (
        <ConfirmationOverlay
          type="delete"
          title="Delete Item"
          message={`Are you sure you want to remove ${dish.name} from your cart?`}
          onConfirm={onDelete}
          onCancel={() => setShowDeleteConfirmation(false)}
        />
      )}

      <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl overflow-hidden transition-all duration-300">
        <button
          onClick={() => setShowDeleteConfirmation(true)}
          className="absolute top-2 right-2 z-10 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors"
        >
          <FaTrash />
        </button>

        <div className="h-48 relative overflow-hidden border-b-2">
          <img
            className="w-full h-full object-cover"
            src={dish.image}
            alt={dish.name}
          />
        </div>

        <div className="p-4 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold text-yellow-300">{dish.name}</h2>
              <span className="text-2xl font-bold text-green-400">
                ₹{totalCost}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center text-gray-300">
                <FaHotel className="mr-2" />
                <p className="text-sm">{dish.hotelName}</p>
              </div>
              <div className="flex items-center text-gray-400">
                <FaCalendarAlt className="mr-2" />
                <p className="text-sm">{formatDate(dish.time)}</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center bg-gray-700 rounded-full p-2">
            <button
              onClick={handleDecrement}
              className="bg-gray-600 text-white p-2 rounded-full hover:bg-gray-500"
            >
              <FaMinus />
            </button>
            <span className="text-lg font-bold text-white">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="bg-gray-600 text-white p-2 rounded-full hover:bg-gray-500"
            >
              <FaPlus />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartCard;
