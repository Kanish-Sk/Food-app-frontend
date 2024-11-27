import React, { useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Shared/context/UserContext";
import DateRangePicker from "../../Shared/components/DateRangePicker";
import CategoryBar from "../../Shared/components/CategoryBar";
import { hotelsDetails } from "../../Shared/data/HomeData";
import { dishes } from "../../Shared/data/DishData";
import { orders } from "../../Shared/data/OrdersData";
import OrderCard from "../component/OrdersCard";
import LazyLoad from "../../Shared/components/LazyLoadCard";
import LoadingOverlay from "../../Shared/components/LoadingOverLay";

const Order = () => {
  const { hotelName } = useParams();
  const formatedHotelName = hotelName?.replace(/-/g, " ");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const { searchQuery } = useContext(UserContext);
  const [orderData, setOrderData] = useState([]);
  const [isDataLoading, setIsDataLoading] = useState(true);

  console.log(orders);

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
    setTimeout(() => {
      const combinedData = orders.map((order) => {
        const dish = dishes.find((d) => d.id === order.dishId) || {};
        const hotel = hotelsDetails.find((h) => h.id === order.hotelId) || {};
        return { ...order, dish, hotel };
      });
      setOrderData(combinedData);
      setIsDataLoading(false);
    }, 1000);
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
    .filter((order) =>
      formatedHotelName && formatedHotelName !== "All"
        ? order.hotelName?.toLowerCase() === formatedHotelName.toLowerCase()
        : true
    )
    .filter(
      (order) => selectedCategory === "All" || order.status === selectedCategory
    )
    .filter(
      (order) =>
        (fromDate === "" || new Date(order.orderDate) >= new Date(fromDate)) &&
        (toDate === "" || new Date(order.orderDate) <= new Date(toDate))
    )
    .filter((order) => {
      const dishName = order.dish?.name || "";
      const hotelName = order.hotel?.name || "";
      return (
        dishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotelName.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-center font-bold text-xl md:text-2xl mb-6">
        {formatedHotelName !== "All"
          ? `Orders from ${formatedHotelName}`
          : "Your Orders"}
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

      {isDataLoading ? (
        <LoadingOverlay />
      ) : filteredOrders.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-5">
          {filteredOrders.map((order, index) => (
            <LazyLoad key={order.orderId}>
              <OrderCard
                id={index}
                order={order}
                statusStats={color}
                className="transition-transform duration-300 hover:scale-105"
                handleUpdateOrder={handleUpdateOrder}
                handleNewOrder={handleNewOrder}
                isLoading={false}
              />
            </LazyLoad>
          ))}
        </div>
      ) : (
        <h5 className="w-full text-2l text-gray-500 text-center justify-center">
          No Orders found :(
        </h5>
      )}
    </div>
  );
};

export default Order;
