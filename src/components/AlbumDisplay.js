import React, { useContext } from "react";
import { SearchContext } from "../context";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
const Discogs = require("disconnect").Client;
const db = new Discogs({
  consumerKey: "kydDpioYTpsCBqbnENeT",
  consumerSecret: "THUzdLLZNTOshjwnnbKmmOylYyNRWBFv",
}).database();

function getModalStyle() {
  return {
    top: `5%`,
    left: `5%`,
    transform: `translate(-0%, -0%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,

    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function AlbumDisplay({
  albumId,
  title,
  country,
  albumImage,
  label,
  year,
  format,
}) {
  const { tracks, setTracks } = useContext(SearchContext);
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className="album">
      <div className="cover-title">
        <div className="info">{title}</div>
        <img className="cover" src={albumImage} />
      </div>
      <div className="album-info">
        <div className="info">Year: {year}</div>
        <div className="info">Country: {country}</div>
        <div className="info">Label: {label}</div>
        <div className="info">Format: {format}</div>
        <button
          className="info"
          onClick={async (e) => {
            e.preventDefault();
            const res = await db.getMaster(albumId, function (err, data) {
              console.log(err, data, albumId);
              setTracks(data.tracklist);

              handleOpen();
            });
          }}
        >
          View Track List
        </button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div style={modalStyle} className={classes.paper}>
          <h2 id="simple-modal-title">Track List:</h2>
          {tracks &&
            tracks.map((tracks) => (
              <div className="sm-font" id="simple-modal-description">
                {tracks.title}
              </div>
            ))}
        </div>
      </Modal>
    </div>
  );
}

export default AlbumDisplay;
