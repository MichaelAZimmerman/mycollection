import React, { useRef, useState, useContext } from "react";
import { SearchContext, UserContext } from "../context";
import AlbumDisplay from "./AlbumDisplay";
const Discogs = require("disconnect").Client;
const db = new Discogs({
  consumerKey: "kydDpioYTpsCBqbnENeT",
  consumerSecret: "THUzdLLZNTOshjwnnbKmmOylYyNRWBFv",
}).database();

const Search = () => {
  const { search, setSearch } = useContext(SearchContext);
  const [error, setError] = useState(null);
  const searchRef = useRef(null);
  return (
    <>
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
              "artist",
              function (err, data) {
                console.log(err, data);
              }
            );

            if (res.err) {
              return setError(res.err);
            }

            setSearch(res.data);
            console.log(search);
          }}
        >
          Search
        </button>
      </form>
      {error && <div className="error">{error}</div>}
      {search && (
        <div>
          {search.map((album) => (
            <AlbumDisplay
              albumId={album.id}
              albumTitle={album.title}
              artistName={album.artist.name}
              albumImage={album.cover_medium}
              tracklist={album.tracklist}
              key={album.id}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default Search;
