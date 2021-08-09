import React, { useRef, useState, useContext, useMemo } from "react";
import { SearchContext, WantListContext, CollectionContext } from "../context";
import AlbumDisplay from "./AlbumDisplay";
const Discogs = require("disconnect").Client;
const db = new Discogs({
  consumerKey: "kydDpioYTpsCBqbnENeT",
  consumerSecret: "THUzdLLZNTOshjwnnbKmmOylYyNRWBFv",
}).database();

const Search = () => {
  const { search, setSearch, clearSearch } = useContext(SearchContext);
  const [error, setError] = useState(null);
  const searchRef = useRef(null);
  const { collection, addCollection, removeCollection } =
    useContext(CollectionContext);
  const { wantList, addWantList, removeWantList } = useContext(WantListContext);

  const collectIds = useMemo(() => {
    return collection.map((val) => val.album_id);
  }, [collection]);
  const wantIds = useMemo(() => {
    return wantList.map((val) => val.album_id);
  }, [wantList]);
  return (
    <div>
      <form>
        <div className="input-fields">
          <label htmlFor="search">Search</label>
          <input
            id="search"
            ref={searchRef}
            placeholder="Search for Album"
          ></input>
        </div>
        <button
          onClick={async (e) => {
            e.preventDefault();
            setError(null);
            if (searchRef.current.value.length < 3) {
              return setError("Must be at least 3 characters in search");
            }
            const res = await db.search(
              searchRef.current.value,
              "release-title",
              function (err, data) {
                clearSearch();

                setSearch(data.results);
              }
            );

            if (res.err) {
              return setError(res.err);
            }
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
                album_id={album.master_id}
                title={album.title}
                country={album.country}
                thumb={album.thumb}
                label={album.label[0]}
                year={album.year}
                format={album.format[0]}
                key={album.id}
                addWantList={addWantList}
                removeWantList={removeWantList}
                removeCollection={removeCollection}
                addCollection={addCollection}
                isWanted={wantIds.includes(album.id)}
                isCollected={collectIds.includes(album.id)}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Search;
