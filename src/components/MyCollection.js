import React, { useContext, useMemo } from "react";
import AlbumDisplay from "./AlbumDisplay";
import { UserContext } from "../context/UserContext";
import { CollectionContext } from "../context/CollectionContext";
import { WantListContext } from "../context";

const MyCollection = () => {
  const { username } = useContext(UserContext);
  const { removeWantList, addWantList, wantList } = useContext(WantListContext);
  const { removeCollection, collection } = useContext(CollectionContext);
  const wantIds = useMemo(() => {
    return wantList.map((val) => val.album_id);
  }, [wantList]);
  return (
    <>
      <h4>{username}'s Music Collection</h4>
      <div className="flex-wrap">
        {collection.map((album) => (
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
            addWantList={addWantList}
            removeWantList={removeWantList}
            isCollected={true}
            isWanted={wantIds.includes(album.album_id)}
          />
        ))}
      </div>
    </>
  );
};

export default MyCollection;
