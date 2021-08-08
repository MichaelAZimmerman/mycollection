const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const {
  wantAlbum,
  unwantAlbum,
  wantByUserID,
} = require("../models/wantlists.model");

router.post("/add", auth, (req, res) => {
  const { album } = req.body;
  console.log({ album });
  if (album && album.title && album.year && album.format) {
    return wantAlbum(res, req.user.id, album);
  }
  return res.send({
    success: false,
    error: "Invalid data provided.",
    data: null,
  });
});

router.delete("/delete/:album_id", auth, (req, res) => {
  const { album_id } = req.params;
  return unwantAlbum(res, req.user.id, album_id);
});

router.get("/user", auth, (req, res) => {
  return wantByUserID(res, req.user.id);
});

module.exports = router;
