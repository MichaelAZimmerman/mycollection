import React, { useRef, useState, useMemo, useContext } from "react";
import AlbumDisplay from "./AlbumDisplay";
import useFetch from "../hooks/useFetch";
import { CollectionContext, WantListContext } from "../context";

const BrowseUsers = () => {
  const [search, setSearch] = useState([]);
  const [error, setError] = useState(null);
  const searchRef = useRef(null);
  const { collection, addCollection, removeCollection } =
    useContext(CollectionContext);
  const { wantList, addWantList, removeWantList } = useContext(WantListContext);
  const { APIcall: userCall } = useFetch("GET");
  const collectIds = useMemo(() => {
    return collection.map((val) => val.album_id);
  }, [collection]);
  const wantIds = useMemo(() => {
    return wantList.map((val) => val.album_id);
  }, [wantList]);
  return (
    <>
      <div className="info">This section is currently under construction</div>
      <form>
        <div>
          <label htmlFor="search">Search</label>
          <input id="search" ref={searchRef} placeholder="Search by Username" />
        </div>
        <button
          onClick={async (e) => {
            e.preventDefault();
            setError(null);
            if (searchRef.current.value.length < 4) {
              return setError("Must be at least 4 characters in search.");
            }
            const res = await userCall(
              `/api/mycollection/users/` + searchRef.current.value
            );
            if (res.error) {
              return setError(res.error);
            }
            setSearch(res.data);
          }}
        >
          Search
        </button>
      </form>
      {error && <div className="error">{error}</div>}
      {search && (
        <div className="flex-column">
          {search
            .filter((search) => search.label)
            .map((album) => (
              <AlbumDisplay
                album_id={album.album_id}
                title={album.title}
                country={album.country}
                thumb={album.thumb}
                label={album.label}
                year={album.year}
                format={album.format}
                key={album.id}
                addWantList={addWantList}
                removeWantList={removeWantList}
                removeCollection={removeCollection}
                addCollection={addCollection}
                isWanted={wantIds.includes(album.album_id)}
                isCollected={collectIds.includes(album.album_id)}
              />
            ))}
        </div>
      )}
    </>
  );
};

export default BrowseUsers;
