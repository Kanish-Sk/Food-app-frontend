import { useContext } from "react";
import { Link } from "react-router-dom";
import LazyLoad from "../../Shared/components/LazyLoadCard";
import CartCard from "../components/CartCard";
import { CartContext } from "../../Shared/context/CartContext";
import { orders } from "../../Shared/data/OrdersData";
import { toast } from "react-toastify";

const Cart = () => {
  const { cartItems, clearCart } = useContext(CartContext);
  console.log(cartItems);

  const handlePlaceOrder = () => {
    orders.push(
      ...cartItems.map((item) => ({
        ...item,
        price: item.price * item.quantity,
        status: "Waiting",
      }))
    );
    toast.success("Item added to the cart.c");
    clearCart();
  };

  return (
    <div className="min-h-screen p-4">
      {cartItems.length > 0 ? (
        <div>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
            <button
              onClick={handlePlaceOrder}
              className="text-base mb-5 md:text-lg font-serif w-fit uppercase text-white bg-gradient-to-r from-green-500 to-green-600 rounded-lg px-3 md:px-4 py-2 transition ease-in-out duration-300 hover:from-green-600 hover:to-green-700 hover:shadow-lg"
            >
              Place Order
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {cartItems.flat().map((dish) => (
              <LazyLoad>
                <CartCard key={dish.id} dish={dish} />
              </LazyLoad>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="w-full text-2xl font-semibold h-full flex flex-col gap-7 items-center justify-center">
            <p>Cart is Empty!</p>
          </div>
          <Link
            to={"/"}
            className="bg-green-500 px-3 pt-1 pb-2 mt-4 rounded-full hover:bg-green-600"
          >
            +
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
