const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
require("dotenv").config();
//const MongoStore = require("connect-mongo");
const path = require("path");
const cseRoute = require("./routes/cse");
const eeeRoute = require("./routes/eee");
const mechaRoute = require("./routes/mecha");
const civilRoute = require("./routes/civil");
const userRoute = require("./routes/user");
const session = require("express-session");
const flash = require("connect-flash");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 10000;
const secretkey = process.env.SECRET_KEY;
//express session
app.use(
  session({
    secret: "secretkey", // use process.env.SECRET in production
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // optional: 7 days
    },
  })
);

app.use(flash());
app.use(cookieParser());
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  const token = req.session.token;
  jwt.verify(token, secretkey, (err, decoded) => {
    req.user = decoded;
    if (token) {
      res.locals.Username = req.user.username;
    }
  });
  next();
});
//middleware
app.set("view engine", "ejs");
app.use("/public", express.static("public"));
app.set("/views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//routes
app.use("/", userRoute);
//cse
app.use("/cse", cseRoute);
//eee
app.use("/eee", eeeRoute);
//mecha
app.use("/mecha", mechaRoute);
//civil
app.use("/civil", civilRoute);
//unavailable route
app.all("*", (req, res) => {
  res.render("404");
});
// error handling route
// Error handling middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Some Error Occurred";
  res.render("errorpage", { status, message });
});

// Start server (local development)
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

