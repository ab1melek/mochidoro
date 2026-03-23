'use client';

import { createContext, useContext } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // MVP: userId hardcoded to 1
  const userId = 1;

  return (
    <UserContext.Provider value={{ userId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};
