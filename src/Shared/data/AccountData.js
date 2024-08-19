export const accounts = [
  {
    accountId: 1,
    userId: 1,
    hotelId: 1,
    role: "Customer",
    accountStartedDate: "2024-01-15",
    totalAmount: 2000,
    // dueDate will be taken from hotel with hotelId 1
  },
  {
    accountId: 2,
    userId: 1,
    hotelId: 3,
    role: "Customer",
    accountStartedDate: "2024-02-10",
    totalAmount: 3000,
    // dueDate will be taken from hotel with hotelId 3
  },
  {
    accountId: 3,
    userId: 2,
    hotelId: 2,
    role: "Customer",
    accountStartedDate: "2024-03-05",
    totalAmount: 1500,
    // dueDate will be taken from hotel with hotelId 2
  },
  {
    accountId: 4,
    userId: 3,
    hotelId: 1,
    role: "Customer",
    accountStartedDate: "2024-04-20",
    totalAmount: 2500,
    // dueDate will be taken from hotel with hotelId 1
  },
  {
    accountId: 5,
    userId: 3,
    hotelId: 2,
    role: "Customer",
    accountStartedDate: "2024-05-15",
    totalAmount: 1200,
    // dueDate will be taken from hotel with hotelId 2
  },
  {
    accountId: 6,
    userId: 3,
    hotelId: 3,
    role: "Customer",
    accountStartedDate: "2024-06-10",
    totalAmount: 2200,
    // dueDate will be taken from hotel with hotelId 3
  },
];
