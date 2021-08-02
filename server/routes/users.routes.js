const express = require("express");
const passport = require("passport");
const router = express.Router();
const { signup, login } = require("../models/users.model");
const auth = require("../middleware/auth.middleware");
const { validate } = require("uuid");

function validate(username, password) {
  return (
    username &&
    username.length >= 4 &&
    username.length <= 20 &&
    password &&
    password.length >= 4 &&
    password.length <= 20
  );
}

router.get("/validation", auth, (req, res) => {
  return res.send({
    success: true,
    error: null,
    data: { username: req.user.username },
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwt");
  return res.send({ success: true, error: null, body: null });
});

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  if (validate(username, password)) {
    return signup(res, username, password);
  }
  return res.send({
    success: false,
    data: null,
    error: "Invalid data provided by user",
  });
});
