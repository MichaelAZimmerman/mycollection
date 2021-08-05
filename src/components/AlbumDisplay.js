import React from "react";

function AlbumDisplay({
  albumId,
  albumTitle,
  artistName,
  albumImage,
  tracklist,
  key,
}) {
  return (
    <div>
      <h4>{albumTitle}</h4>
      <img src={albumImage} />
    </div>
  );
}

export default AlbumDisplay;
