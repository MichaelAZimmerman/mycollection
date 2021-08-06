import React, { createContext, useCallback, useState } from "react";

export const SearchContext = createContext(null);

export function SearchProvider(props) {
  const [tracks, setTracks] = useState([]);
  const [search, setSearch] = useState([]);
  const clearSearch = useCallback(() => setSearch([]), []);

  return (
    <SearchContext.Provider
      value={{ search, setSearch, clearSearch, tracks, setTracks }}
    >
      {props.children}
    </SearchContext.Provider>
  );
}
