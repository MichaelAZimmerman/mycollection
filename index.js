require("dotenv").config();
require("./server/config/mysql.conf");
const Discogs = require("disconnect").Client;
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const passportConfig = require("./server/config/passport.conf");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const userRoutes = require("./server/routes/users.routes");
const collectionRoutes = require("./server/routes/collections.routes");
const wantListRoutes = require("./server/routes/wantlists.routes");

app.use(express.json());
passportConfig(passport);
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/mycollection", collectionRoutes);
app.use("/api/mywishlist", wantListRoutes);

app.use(express.static(__dirname + "/build"));
app.use(passport.initialize());

app.get("*", (req, res) => {
  return res.sendFile("/build/index.html", { root: __dirname + "/" });
});

app.listen(PORT, () =>
  console.log("You're talking to the MyCollection database")
);

app.get("/authorize", function (req, res) {
  var oAuth = new Discogs().oauth();
  oAuth.getRequestToken(
    CONSUMER_KEY,
    CONSUMER_SECRET,
    "http://localhost:3000/callback",
    function (err, requestData) {
      // Persist "requestData" here so that the callback handler can
      // access it later after returning from the authorize url
      res.redirect(requestData.authorizeUrl);
    }
  );
});

app.get("/callback", function (req, res) {
  var oAuth = new Discogs(requestData).oauth();
  oAuth.getAccessToken(
    req.query.oauth_verifier, // Verification code sent back by Discogs
    function (err, accessData) {
      // Persist "accessData" here for following OAuth calls
      res.send("Received access token!");
    }
  );
});

app.get("/identity", function (req, res) {
  var dis = new Discogs(accessData);
  dis.getIdentity(function (err, data) {
    res.send(data);
  });
});
