const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const {
  addAlbum,
  removeAlbum,
  byUserId,
} = require("../models/collections.model");

router.post("/add", auth, (req, res) => {
  const { album } = req.body;
  if (album && album.thumb && album.title) {
    return addAlbum(res, req.user.id, album);
  }
  return res.send({
    success: false,
    error: "Invalid data provided.",
    data: null,
  });
});
