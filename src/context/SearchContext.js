import React, { createContext, useCallback, useState } from "react";

export const SearchContext = createContext(null);

export function SearchProvider(props) {
  const [search, setSearch] = useState([]);
  const clearSearch = useCallback(() => setSearch([]), []);

  return (
    <SearchContext.Provider value={{ search, setSearch, clearSearch }}>
      {props.children}
    </SearchContext.Provider>
  );
}
