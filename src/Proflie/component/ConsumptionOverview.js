import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import CategoryBar from "../../Shared/components/CategoryBar";

ChartJS.register(ArcElement, Tooltip, Legend);

const ConsumptionOverview = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("day");
  const [foodTypeData, setFoodTypeData] = useState({
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }],
  });
  const [amountSpentData, setAmountSpentData] = useState({
    labels: [],
    datasets: [{ data: [], backgroundColor: [] }],
  });

  const timeframes = ["day", "week", "month", "year"];

  useEffect(() => {
    fetchAndProcessData();
  }, [selectedTimeframe]);

  const fetchAndProcessData = () => {
    // Mock data - in a real application, this would fetch data based on the selectedTimeframe
    const mockFoodTypeData = {
      labels: ["Breakfast", "Lunch", "Dinner", "Snacks"],
      datasets: [
        {
          data: [30, 40, 20, 10],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        },
      ],
    };

    const mockAmountSpentData = {
      labels: ["Food", "Drinks", "Desserts"],
      datasets: [
        {
          data: [300, 150, 100],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        },
      ],
    };

    setFoodTypeData(mockFoodTypeData);
    setAmountSpentData(mockAmountSpentData);
  };

  return (
    <div className="bg-white w-full md:w-3/5 shadow-md rounded-lg p-6 h-fit">
      <h2 className="text-2xl font-bold mb-4">Consumption Overview</h2>
      <CategoryBar
        selectedCategory={selectedTimeframe}
        onSelectCategory={setSelectedTimeframe}
        categories={timeframes}
      />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-64">
          {" "}
          {/* Set a fixed height */}
          <h3 className="text-lg font-semibold mb-2">Food Type Distribution</h3>
          {foodTypeData.datasets[0].data.length > 0 ? (
            <div className="h-full">
              {" "}
              {/* Wrapper div with full height */}
              <Pie
                data={foodTypeData}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                }}
              />
            </div>
          ) : (
            <p>No data available</p>
          )}
        </div>
        <div className="h-64">
          {" "}
          {/* Set a fixed height */}
          <h3 className="text-lg font-semibold mb-2">
            Amount Spent Distribution
          </h3>
          {amountSpentData.datasets[0].data.length > 0 ? (
            <div className="h-full">
              {" "}
              {/* Wrapper div with full height */}
              <Pie
                data={amountSpentData}
                options={{
                  maintainAspectRatio: false,
                  responsive: true,
                }}
              />
            </div>
          ) : (
            <p>No data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsumptionOverview;
