import React, { useState } from "react";
import OwnerAccountDetail from "../component/OwnerAccountDetails";

const OwnerAccount = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <div className="max-w-md mx-auto space-y-6 p-4">
      <OwnerAccountDetail />
    </div>
  );
};

export default OwnerAccount;
