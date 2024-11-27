import { useContext, useEffect, useState } from "react";
import { userData } from "../../Shared/data/UserData";
import CustomerDetial from "../components/CustomerDetials";
import LoadingOverlay from "../../Shared/components/LoadingOverLay";
import { UserContext } from "../../Shared/context/UserContext";
import { useParams } from "react-router-dom";

const OwnerCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { searchQuery } = useContext(UserContext);
  const { customerId } = useParams();

  useEffect(() => {
    const fetchCustomers = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setCustomers(userData);
      setIsLoading(false);
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((user) => {
    if (customerId) {
      return user?.userId.toString() === customerId;
    }
    if (searchQuery) {
      return (
        user?.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user?.phoneNumber.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return user?.role !== "owner";
  });

  console.log(filteredCustomers);

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl text-center font-bold mb-4">Customers</h1>
      {isLoading && <LoadingOverlay />}
      {filteredCustomers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-4">
          {filteredCustomers?.map((customer, index) => {
            return <CustomerDetial id={index} customer={customer} />;
          })}
        </div>
      ) : !isLoading ? (
        <h2 className="text-center text-xl w-full text-gray-600">
          No customers found
        </h2>
      ) : null}
    </div>
  );
};

export default OwnerCustomers;
