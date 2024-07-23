export const hotelsDetails = [
  {
    id: 1,
    name: "Saravana Bhavan",
    image:
      "https://c8.alamy.com/comp/B8NGKB/india-tamil-nadu-chennai-egmore-saravana-bhavan-restaurant-at-night-B8NGKB.jpg",
    contact: 9876543210,
    location: "123 South St, Chennai",
    owner: "Anand Mahadevan",
    type: "Vegetarian",
    timing: "7 AM - 10 PM",
    dishIds: [1, 2, 4, 5, 6, 7, 8, 9, 10, 11], // Updated IDs of dishes offered by this hotel
    accounts: [1, 4], // Account IDs linked to this hotel
    orders: [1, 4], // Order IDs linked to this hotel
    dueDate: "2024-06-15", // Due date for all accounts linked to this hotel
    categories: [
      "Breakfast",
      "Snack",
      "Dessert",
      "Appetizer",
      "Main Course",
      "Beverage",
      "Soup",
      "Salad",
      "Side Dish",
      "Special",
    ], // Categories for Saravana Bhavan
  },
  {
    id: 2,
    name: "Murugan Idli Shop",
    image:
      "https://media-cdn.tripadvisor.com/media/photo-s/0d/aa/ea/1f/this-is-the-first-ever.jpg",
    contact: 9123456780,
    location: "456 Temple Road, Madurai",
    owner: "Murugan",
    type: "Vegetarian",
    timing: "6 AM - 11 PM",
    dishIds: [12, 13, 14, 15, 16, 17, 18, 19, 20], // Updated IDs of dishes offered by this hotel
    accounts: [3, 5], // Account IDs linked to this hotel
    orders: [2, 5], // Order IDs linked to this hotel
    dueDate: "2024-08-20", // Due date for all accounts linked to this hotel
    categories: [
      "Breakfast",
      "Dessert",
      "Snack",
      "Appetizer",
      "Main Course",
      "Beverage",
      "Soup",
      "Salad",
      "Side Dish",
      "Special",
    ], // Categories for Murugan Idli Shop
  },
  {
    id: 3,
    name: "Anjappar Chettinad",
    image:
      "https://content.jdmagicbox.com/comp/coimbatore/50/0422p422stdg001650/catalogue/anjappar-chettinadu-restaurant-sidhapudur-coimbatore-chettinad-restaurants-z36cewlfpq.jpg",
    contact: 9012345678,
    location: "789 Chettinad St, Coimbatore",
    owner: "Arun Kumar",
    type: "Non-Vegetarian",
    timing: "12 PM - 10 PM",
    dishIds: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30], // Updated IDs of dishes offered by this hotel
    accounts: [2, 6], // Account IDs linked to this hotel
    orders: [3], // Order IDs linked to this hotel
    dueDate: "2024-06-25", // Due date for all accounts linked to this hotel
    categories: [
      "Main Course",
      "Appetizer",
      "Dessert",
      "Snack",
      "Breakfast",
      "Beverage",
      "Soup",
      "Salad",
      "Side Dish",
      "Special",
    ], // Categories for Anjappar Chettinad
  },
];

export const topDishes = [
  {
    name: "Idli",
    price: 20,
    hotelName: "Saravana Bhavan",
    type: "Breakfast",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoWFVpIrZRPR-_dDGNPgwQ2Ut1zts17NHWRA&s",
  },
  {
    name: "Podi Idli",
    price: 30,
    hotelName: "Murugan Idli Shop",
    type: "Breakfast",
    image:
      "https://threewhistleskitchen.com/wp-content/uploads/2019/08/Podi-Idli-Featured.jpg",
  },
  {
    name: "Chicken Chettinad",
    price: 150,
    hotelName: "Anjappar Chettinad Restaurant",
    type: "Main Course",
    image: "https://i.ytimg.com/vi/2qlRzawVmkA/maxresdefault.jpg",
  },
];
