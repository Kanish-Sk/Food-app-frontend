import React, { createContext, useState } from "react";

// Create a context with default values
export const UserContext = createContext({
  username: "",
  setUsername: () => {},
  isLogin: false,
  setIsLogin: () => {},
  darkMode: false,
  setDarkMode: () => {},
  darkModeEditPermission: true,
  setDarkModeEditPermission: () => {},
  searchQuery: null,
  setSearchQuery: () => {},
});

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [darkModeEditPermission, setDarkModeEditPermission] = useState(true);
  const [searchQuery, setSearchQuery] = useState(null);

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        isLogin,
        setIsLogin,
        darkMode,
        setDarkMode,
        darkModeEditPermission,
        setDarkModeEditPermission,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
