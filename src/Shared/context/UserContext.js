import React, { createContext, useState } from "react";

export const UserContext = createContext({
  username: null,
  setUsername: () => {},
  role: null,
  setRole: () => {},
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
  const [role, setRole] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [darkModeEditPermission, setDarkModeEditPermission] = useState(true);
  const [searchQuery, setSearchQuery] = useState(null);

  return (
    <UserContext.Provider
      value={{
        username,
        setUsername,
        role,
        setRole,
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
