import React from "react";
import { Pie } from "react-chartjs-2";

const SpendingOverview = ({ spentAmount, budget }) => {
  const pieChartData = {
    labels: ["Spent", "Remaining"],
    datasets: [
      {
        data: [spentAmount, budget - spentAmount],
        backgroundColor: ["#FF6384", "#4BC0C0"],
        hoverBackgroundColor: ["#FF6384", "#4BC0C0"],
      },
    ],
  };

  return (
    <div className="w-48 h-48 mx-auto">
      <Pie
        data={pieChartData}
        options={{ responsive: true, maintainAspectRatio: true }}
      />
    </div>
  );
};

export default SpendingOverview;
