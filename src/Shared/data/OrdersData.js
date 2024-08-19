export const orders = [
  {
    orderId: 1,
    userId: 1,
    accountId: 1,
    dishId: 1,
    hotelId: 1,
    status: "Delivered",
    orderDate: "2024-07-21T14:30:00Z",
    price: 20,
    quantity: 2, // Added quantity
    paid: false,
  },
  {
    orderId: 2,
    userId: 2,
    accountId: 3,
    dishId: 1,
    hotelId: 2,
    status: "Preparing",
    orderDate: "2024-07-22T09:15:00Z",
    price: 30,
    quantity: 1, // Added quantity
    paid: false,
  },
  {
    orderId: 3,
    userId: 1,
    accountId: 1,
    dishId: 3,
    hotelId: 3,
    status: "Waiting",
    orderDate: "2024-07-22T17:45:00Z",
    price: 180,
    quantity: 3, // Added quantity
    paid: false,
  },
  {
    orderId: 4,
    userId: 3,
    accountId: 4,
    dishId: 2,
    hotelId: 1,
    status: "Delivered",
    orderDate: "2024-07-20T12:00:00Z",
    price: 40,
    quantity: 4, // Added quantity
    paid: false,
  },
  {
    orderId: 5,
    userId: 3,
    accountId: 5,
    dishId: 3,
    hotelId: 2,
    status: "Cancelled",
    orderDate: "2024-07-19T18:30:00Z",
    price: 20,
    quantity: 2, // Added quantity
    paid: false,
  },
];
