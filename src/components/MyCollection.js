import React, { useContext } from "react";
import AlbumDisplay from "./AlbumDisplay";
import { UserContext } from "../context/UserContext";
import { CollectionContext } from "../context/CollectionContext";

const MyCollection = () => {
  const { username } = useContext(UserContext);
  const { removeCollection, collection } = useContext(CollectionContext);
  return (
    <>
      <h4>{username}'s Music Collection</h4>
      <div className="flex-column">
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
            isCollected={true}
          />
        ))}
      </div>
    </>
  );
};

export default MyCollection;
