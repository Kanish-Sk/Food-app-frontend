import { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [username, setUsername] = useState("");
  const [theme, setTheme] = useState("light");
  const [searchQuery, setSearchQuery] = useState("");

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
