import React, { useRef, useState, useContext } from "react";
import useFetch from "../hooks/useFetch";
import { SearchContext, UserContext } from "../context";
import AlbumDisplay from "./AlbumDisplay";
const albumSearchUrl =
  "https://api.deezer.com/search/album/?index=0&limit=50&output=JSON&q=";

const Search = () => {
  const { search, setSearch } = useContext(SearchContext);
  const [error, setError] = useState(null);
  const searchRef = useRef(null);
  const { APIcall: albumCall } = useFetch("GET");
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
            const res = await albumCall(
              albumSearchUrl + searchRef.current.value
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
