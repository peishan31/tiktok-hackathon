// UserContext.js
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const UsernameProvider = ({ children }) => {
  const [username, setUsername] = useState(null); // Initialize with null or a default value

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUsername = () => {
  return useContext(UserContext);
};
