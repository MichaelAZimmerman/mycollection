import React, { useContext, useMemo } from "react";
import AlbumDisplay from "./AlbumDisplay";
import { UserContext } from "../context/UserContext";
import { CollectionContext } from "../context/CollectionContext";
import { WantListContext } from "../context";

const MyWishlist = () => {
  const { username } = useContext(UserContext);
  const { removeWantList, wantList } = useContext(WantListContext);
  const { removeCollection, addCollection, collection } =
    useContext(CollectionContext);
  const collectIds = useMemo(() => {
    return collection.map((val) => val.album_id);
  }, [collection]);
  return (
    <>
      <h4>{username}'s Wish List</h4>
      <div className="flex-wrap">
        {wantList.map((album) => (
          <AlbumDisplay
            album_id={album.album_id}
            title={album.title}
            country={album.country}
            thumb={album.thumb}
            label={album.label}
            year={album.year}
            format={album.format}
            key={album.id}
            removeCollection={removeCollection}
            addCollection={addCollection}
            removeWantList={removeWantList}
            isCollected={collectIds.includes(album.album_id)}
            isWanted={true}
          />
        ))}
      </div>
    </>
  );
};

export default MyWishlist;
