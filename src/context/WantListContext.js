import React, { createContext, useCallback, useState } from "react";
import useFetch from "../hooks/useFetch";
export const WantListContext = createContext(null);

export function WantListProvider(props) {
  const { APIcall: deleteCall } = useFetch("DELETE");
  const { APIcall: addCall } = useFetch("POST");
  const [wantList, setWantList] = useState([]);

  const addWantList = useCallback(async (album) => {
    const res = await addCall("/api/mywishlist/add", { album });
    if (!res.success) {
      return console.error(res.error);
    }
    setWantList((curr) => [...curr, res.data]);
  }, []);

  const removeWantList = useCallback(async (album_id) => {
    const res = await deleteCall(`/api/mywishlist/delete/${album_id}`);
    if (!res.success) {
      return console.error(res.error);
    }
    setWantList((curr) => curr.filter((val) => val.album_id !== album_id));
  }, []);

  return (
    <WantListContext.Provider
      value={{
        wantList,
        setWantList,
        addWantList,
        removeWantList,
      }}
    >
      {props.children}
    </WantListContext.Provider>
  );
}
