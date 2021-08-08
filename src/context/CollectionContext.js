import React, { createContext, useCallback, useState } from "react";
import useFetch from "../hooks/useFetch";
export const CollectionContext = createContext(null);

export function CollectionProvider(props) {
  const { APIcall: deleteCall } = useFetch("DELETE");
  const { APIcall: addCall } = useFetch("POST");
  const [collection, setCollection] = useState([]);

  const addCollection = useCallback(async (album) => {
    const res = await addCall("/api/mycollection/add", { album });
    if (!res.success) {
      return console.error(res.error);
    }
    setCollection((curr) => [...curr, res.data]);
  }, []);

  const removeCollection = useCallback(async (album_id) => {
    const res = await deleteCall(`/api/mycollection/delete/${album_id}`);
    if (!res.success) {
      return console.error(res.error);
    }
    setCollection((curr) => curr.filter((val) => val.album_id !== album_id));
  }, []);

  return (
    <CollectionContext.Provider
      value={{
        collection,
        setCollection,
        addCollection,
        removeCollection,
      }}
    >
      {props.children}
    </CollectionContext.Provider>
  );
}
