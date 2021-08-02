const express = require("express");
const passport = require("passport");
const router = express.Router();
const { signup, login } = require("../models/users.model");
const auth = require("../middleware/auth.middleware");

router.get("/validation", auth, (req, res) => {
  return res.send({
    success: true,
    error: null,
    data: { username: req.user.username },
  });
});
