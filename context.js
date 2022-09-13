import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export function DataWrapper({ children }) {
  let sharedState = {};

  return (
    <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>
  );
}

export function useSharedData() {
  return useContext(AppContext);
}
