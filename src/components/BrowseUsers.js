import React, { useRef, useState } from "react";
import AlbumDisplay from "./AlbumDisplay";
import useFetch from "../hooks/useFetch";

const BrowseUsers = () => {
  const [search, setSearch] = useState([]);
  const [error, setError] = useState(null);
  const searchRef = useRef(null);
  const { APIcall: userCall } = useFetch("GET");
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
            console.log(search);
          }}
        >
          Search
        </button>
      </form>
    </>
  );
};

export default BrowseUsers;
