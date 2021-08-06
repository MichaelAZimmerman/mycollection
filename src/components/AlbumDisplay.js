import React from "react";

function AlbumDisplay({
  albumId,
  title,
  country,
  albumImage,
  label,
  year,
  format,
}) {
  return (
    <div className="album">
      <div>{title}</div>
      <img src={albumImage} />
      <div>Year: {year}</div>
      <div>Country: {country}</div>
      <div>Label: {label}</div>
      <div>Format: {format}</div>
    </div>
  );
}

export default AlbumDisplay;
