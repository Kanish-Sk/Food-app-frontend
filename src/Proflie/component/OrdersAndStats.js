import React, { useContext, useEffect, useMemo, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import CategoryBar from "../../Shared/components/CategoryBar";
import { UserContext } from "../../Shared/context/UserContext";
import OrderCard from "../../Orders/component/OrdersCard";
import { orders } from "../../Shared/data/OrdersData";
import { dishes } from "../../Shared/data/DishData";
import { hotelsDetails } from "../../Shared/data/HomeData";

ChartJS.register(ArcElement, Tooltip, Legend);

const OrdersAndStats = ({ totalAmount = 5000 }) => {
  const [orderData, setOrderData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("Day");
  const { searchQuery } = useContext(UserContext);

  const color = useMemo(
    () => ({
      Day: "bg-green-500",
      Week: "bg-purple-500",
      Month: "bg-yellow-500",
      Year: "bg-pink-500",
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

  const filterOrdersByCategory = (orders, category) => {
    const now = new Date();
    let startDate;

    switch (category) {
      case "Day":
        startDate = new Date(now.setHours(0, 0, 0, 0));
        break;
      case "Week":
        startDate = new Date(now.setDate(now.getDate() - now.getDay()));
        break;
      case "Month":
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case "Year":
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        return orders;
    }

    return orders.filter((order) => new Date(order.orderDate) >= startDate);
  };

  const filterOrdersBySearchQuery = (orders, query) => {
    if (!query) return orders;

    const lowercaseQuery = query.toLowerCase();
    return orders.filter(
      (order) =>
        order.dish.name.toLowerCase().includes(lowercaseQuery) ||
        order.hotel.name.toLowerCase().includes(lowercaseQuery) ||
        order.status.toLowerCase().includes(lowercaseQuery)
    );
  };

  const filteredOrders = useMemo(() => {
    let filtered = filterOrdersByCategory(orderData, selectedCategory);
    filtered = filterOrdersBySearchQuery(filtered, searchQuery);
    return filtered;
  }, [orderData, selectedCategory, searchQuery]);

  const calculateTotalSpent = (orders) => {
    return orders.reduce((total, order) => total + order.price, 0);
  };

  const totalSpent = calculateTotalSpent(filteredOrders);

  const pieChartData = {
    labels: ["Spent", "Remaining"],
    datasets: [
      {
        data: [totalSpent, totalAmount - totalSpent],
        backgroundColor: ["#FF6384", "#36A2EB"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB"],
      },
    ],
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg h-full">
      <h2 className="text-2xl font-bold text-white text-center mb-4">
        Spend Overview
      </h2>
      <div className="mt-3 mb-5 md:-mb-3">
        <CategoryBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categories={["Day", "Week", "Month", "Year"]}
          color={color}
          isAll={false}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-6/12 pr-4 bg-gray-200 rounded-lg">
          <h3 className="text-xl font-semibold text-black text-center mb-2">
            Recent Orders
          </h3>
          <div className="h-96 overflow-y-scroll scroll-smooth no-scrollbar">
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <div className="mb-4 ml-4" key={order.orderId}>
                  <OrderCard
                    order={order}
                    onReOrder={() => console.log("Reorder")}
                    onPayOrder={() => console.log("Pay Order")}
                    onCancelOrder={() => console.log("Cancel Order")}
                    statusStats={{
                      Delivered: "bg-green-500 text-white",
                      Preparing: "bg-yellow-500 text-black",
                      Waiting: "bg-red-500 text-white",
                      Cancelled: "bg-gray-500 text-white",
                    }}
                  />
                </div>
              ))
            ) : (
              <div className="text-center text-gray-800">
                No orders found
                <div className="text-gray-500">
                  Try adjusting your filters or search query
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-full md:w-6/12 mt-4 md:mt-0">
          <h3 className="text-xl font-semibold text-white text-center mb-2">
            Spending Overview
          </h3>
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
};

export default OrdersAndStats;
