import React, { useState, useMemo, useEffect } from "react";
import { hotelsDetails } from "../../Shared/data/HomeData";
import { dishes } from "../../Shared/data/DishData";
import { orders as initialOrders } from "../../Shared/data/OrdersData";
import { toast } from "react-toastify";
import OrderCard from "./OrdersCard";

const OrderFunction = ({
  selectedCategory,
  searchQuery,
  fromDate,
  toDate,
  height,
}) => {
  const [orderData, setOrderData] = useState([]);

  const color = useMemo(
    () => ({
      Waiting: "bg-yellow-500",
      Preparing: "bg-blue-500",
      Delivered: "bg-green-500",
      Cancelled: "bg-red-500",
    }),
    []
  );

  useEffect(() => {
    const combinedData = initialOrders.map((order) => {
      const dish = dishes.find((d) => d.id === order.dishId) || {};
      const hotel = hotelsDetails.find((h) => h.id === order.hotelId) || {};
      return { ...order, dish, hotel };
    });
    setOrderData(combinedData);
  }, []);

  const onReOrder = (order) => {
    const newOrder = {
      ...order,
      status: "Waiting",
      orderId: Date.now(),
      orderDate: new Date().toISOString(),
    };
    setOrderData([...orderData, newOrder]);
    toast.success("Ordered successfully!");
  };

  const onPayOrder = (orderId) => {
    setOrderData((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === orderId ? { ...order, paid: true } : order
      )
    );
    toast.success("Payment successful!");
  };

  const cancelOrder = (orderId) => {
    setOrderData((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === orderId ? { ...order, status: "Cancelled" } : order
      )
    );
    toast.success("Order canceled successfully!");
  };

  const filteredOrders = orderData
    .filter(
      (order) => selectedCategory === "All" || order.status === selectedCategory
    )
    .filter(
      (order) =>
        (fromDate === "" || new Date(order.orderDate) >= new Date(fromDate)) &&
        (toDate === "" || new Date(order.orderDate) <= new Date(toDate))
    )
    .filter((order) => {
      const dishName = order.dish.name || "";
      const hotelName = order.hotel.name || "";
      return (
        dishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotelName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

  return (
    <div
      style={{ height: height || "auto", overflowY: "auto" }}
      className="p-4"
    >
      {filteredOrders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.orderId}
              order={order}
              onReOrder={onReOrder}
              onPayOrder={onPayOrder}
              onCancelOrder={cancelOrder}
              statusStats={color}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-8">
          <p className="text-xl font-semibold">No orders found</p>
          <p className="mt-2">Try adjusting your filters or search query</p>
        </div>
      )}
    </div>
  );
};

export default OrderFunction;
