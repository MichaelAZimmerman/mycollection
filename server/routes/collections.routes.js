const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const {
  addAlbum,
  removeAlbum,
  byUserID,
  byUserName,
} = require("../models/collections.model");

router.post("/add", auth, (req, res) => {
  const { album } = req.body;
  console.log({ album });
  if (album && album.title && album.year && album.format) {
    return addAlbum(res, req.user.id, album);
  }
  return res.send({
    success: false,
    error: "Invalid data provided.",
    data: null,
  });
});

router.delete("/delete/:album_id", auth, (req, res) => {
  const { album_id } = req.params;
  return removeAlbum(res, req.user.id, album_id);
});

router.get("/user", auth, (req, res) => {
  return byUserID(res, req.user.id);
});

router.get("/users/:username", auth, (req, res) => {
  const { username } = req.params;
  console.log(username);
  return byUserName(res, username);
});

module.exports = router;
