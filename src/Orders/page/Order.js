import React, { useContext, useEffect, useState } from "react";
import { hotelsDetails } from "../../utility/data/HomeData";
import { dishes } from "../../utility/data/DishData";
import { orders as initialOrders } from "../../utility/data/OrdersData";
import CategoryBar from "../../utility/components/CategoryBar";
import { UserContext } from "../../utility/context/UserContext";
import OrderCard from "../component/OrdersCard";

const Order = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [orderData, setOrderData] = useState([]);
  const { searchQuery } = useContext(UserContext);

  const color = {
    Waiting: "bg-yellow-500",
    Preparing: "bg-blue-500",
    Delivered: "bg-green-500",
    Cancelled: "bg-red-500",
  };

  useEffect(() => {
    const combinedData = initialOrders.map((order) => {
      const dish = dishes.find((d) => d.id === order.dishId) || {};
      const hotel = hotelsDetails.find((h) => h.id === order.hotelId) || {};
      return { ...order, dish, hotel };
    });
    setOrderData(combinedData);
  }, []);

  const cancelOrder = (orderId) => {
    setOrderData((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === orderId ? { ...order, status: "Cancelled" } : order
      )
    );
  };

  const filteredOrders = orderData
    .filter(
      (order) => selectedCategory === "All" || order.status === selectedCategory
    )
    .filter(
      (order) =>
        order.dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen p-6 pt-3 md:p-10 md:pt-2">
      <h1 className="text-center text-xl font-bold mb-4">My Orders</h1>

      <CategoryBar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categories={["Waiting", "Preparing", "Delivered", "Cancelled"]}
        color={color}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
        {filteredOrders.map((order) => (
          <OrderCard
            key={order.orderId}
            order={order}
            onCancelOrder={cancelOrder}
            statusStats={color}
          />
        ))}
      </div>
    </div>
  );
};

export default Order;
