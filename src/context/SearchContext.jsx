import React, { createContext, useState } from "react";

// Create the context
export const SearchContext = createContext();

// Create the provider component
const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  return (
    <SearchContext.Provider value={{ search, setSearch, showSearch, setShowSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider