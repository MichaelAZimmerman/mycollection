import React from "react";
const Discogs = require("disconnect").Client;
const db = new Discogs({
  consumerKey: "kydDpioYTpsCBqbnENeT",
  consumerSecret: "THUzdLLZNTOshjwnnbKmmOylYyNRWBFv",
}).database();

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
      <button
        onClick={async (e) => {
          e.preventDefault();
          const res = await db.getMaster(albumId, function (err, data) {
            console.log(err, data, albumId);
          });
        }}
      >
        TEST
      </button>
    </div>
  );
}

export default AlbumDisplay;
