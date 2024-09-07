import React, { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "../../Shared/context/UserContext";
import DateRangePicker from "../../Shared/components/DateRangePicker";
import CategoryBar from "../../Shared/components/CategoryBar";
import { hotelsDetails } from "../../Shared/data/HomeData";
import { dishes } from "../../Shared/data/DishData";
import { orders } from "../../Shared/data/OrdersData";
import OrderCard from "../component/OrdersCard";
import LazyLoad from "../../Shared/components/LazyLoadCard";

const Order = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const { searchQuery } = useContext(UserContext);
  const [orderData, setOrderData] = useState([]);

  const handleFromDate = (value) => setFromDate(value);
  const handleToDate = (value) => setToDate(value);

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
    const combinedData = orders.map((order) => {
      const dish = dishes.find((d) => d.id === order.dishId) || {};
      const hotel = hotelsDetails.find((h) => h.id === order.hotelId) || {};
      return { ...order, dish, hotel };
    });
    setOrderData(combinedData);
  }, []);

  const handleUpdateOrder = (updatedOrder) => {
    setOrderData((prevOrders) =>
      prevOrders.map((order) =>
        order.orderId === updatedOrder.orderId ? updatedOrder : order
      )
    );
  };

  const handleNewOrder = (newOrder) => {
    setOrderData((prevOrder) => [...prevOrder, newOrder]);
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
    <div className="min-h-screen p-4">
      <h1 className="text-center font-bold text-xl md:text-2xl mb-6">
        Your Orders
      </h1>
      <div className="flex flex-col md:flex-row justify-between">
        <CategoryBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categories={["Waiting", "Preparing", "Delivered", "Cancelled"]}
          color={color}
        />
        <div className="flex justify-between items-start gap-5 mb-4 md:mb-0">
          <DateRangePicker
            handleDateChange={handleFromDate}
            dateLabel="From:"
          />
          <DateRangePicker handleDateChange={handleToDate} dateLabel="To:" />
        </div>
      </div>

      {filteredOrders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
          {filteredOrders.map((order) => (
            <LazyLoad>
              <OrderCard
                key={order.orderId}
                order={order}
                statusStats={color}
                className="transition-transform duration-300 hover:scale-105"
                handleUpdateOrder={handleUpdateOrder}
                handleNewOrder={handleNewOrder}
              />
            </LazyLoad>
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

export default Order;
