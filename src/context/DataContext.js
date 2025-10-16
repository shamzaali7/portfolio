import React, { createContext, useContext } from 'react';
import portfolioData from '../data/portfolio.json';

const DataContext = createContext();

export const usePortfolioData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('usePortfolioData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider = ({ children }) => {
  return (
    <DataContext.Provider value={portfolioData}>
      {children}
    </DataContext.Provider>
  );
};