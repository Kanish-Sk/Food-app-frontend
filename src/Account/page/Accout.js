import React, { useContext, useEffect, useState } from "react";
import AccountCard from "../component/AccountCard";
import { accounts } from "../../utility/data/AccountData";
import { hotelsDetails } from "../../utility/data/HomeData";
import CategoryBar from "../../utility/components/CategoryBar";
import { UserContext } from "../../utility/context/UserContext";
import { isAfter, parseISO } from "date-fns";

const Account = () => {
  const [accountData, setAccountData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { searchQuery } = useContext(UserContext); // Use global searchQuery from context

  // This color mapping is unchanged
  const color = {
    Paid: "bg-blue-500",
    "Advance Payment": "bg-yellow-500",
    "Over-Due": "bg-red-500",
  };

  useEffect(() => {
    // Combine account and hotel data
    const combinedData = accounts.map((account) => {
      const hotel = hotelsDetails.find((hotel) => hotel.id === account.hotelId);
      return {
        ...account,
        hotel: {
          name: hotel.name,
          image: hotel.image,
          owner: hotel.owner,
          contact: hotel.contact,
          location: hotel.location,
          type: hotel.type,
          timing: hotel.timing,
          dueDate: hotel.dueDate,
        },
      };
    });
    setAccountData(combinedData);
  }, []);

  // Determine if an account is overdue
  const isOverdue = (dueDate) => {
    return isAfter(new Date(), parseISO(dueDate));
  };

  // Function to handle payment
  const handlePay = (accountId) => {
    setAccountData((prevAccounts) =>
      prevAccounts.map((account) =>
        account.accountId === accountId
          ? { ...account, totalAmount: 0 } // Update totalAmount to 0
          : account
      )
    );
  };

  // Filter accounts based on selected category and search query
  const filteredAccounts = accountData
    .filter((account) => {
      if (selectedCategory === "All") return true;

      const amountPaid = account.totalAmount === 0;
      const hasDueDate =
        account.hotel.dueDate && isOverdue(account.hotel.dueDate);

      switch (selectedCategory) {
        case "Paid":
          return amountPaid;
        case "Advance Payment":
          return !amountPaid && account.hotel.dueDate;
        case "Over-Due":
          return !amountPaid && hasDueDate;
        default:
          return true;
      }
    })
    .filter(
      (account) =>
        account.hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        account.hotel.owner.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-xl font-bold text-center">Accounts Overview</h1>
      <div className="mb-6 flex flex-col md:flex-row items-center gap-4">
        <CategoryBar
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          categories={["Paid", "Advance Payment", "Over-Due"]}
          color={color}
        />
      </div>
      <div className="grid grid-cols-1 -mt-7 gap-5 md:gap-7 md:grid-cols-3">
        {filteredAccounts.map((account) => (
          <AccountCard
            key={account.accountId}
            account={account}
            onPay={() => handlePay(account.accountId)} // Pass down handlePay function
          />
        ))}
      </div>
    </div>
  );
};

export default Account;
