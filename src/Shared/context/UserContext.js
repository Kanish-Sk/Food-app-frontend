import React, { createContext, useState } from "react";

// Create a context with default values
export const UserContext = createContext({
  username: "",
  setUsername: () => {},
  theme: null,
  setTheme: () => {},
  searchQuery: null,
  setSearchQuery: () => {},
});

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [theme, setTheme] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        theme,
        setTheme,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
