const express = require("express");
const cors = require("cors");
const { localStrategy } = require("./middleware/passport");
const { jwtStrategy } = require("./middleware/passport");
const passport = require("passport");
// Routes
const path = require("path");
const userRoutes = require("./routes/users");

const app = express();
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);
app.use(express.json());
app.use(cors());
app.use(userRoutes);

//Middlewares
app.use((req, res, next) => {
  const err = new Error("Path Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});

/// Run
const run = async () => {
  await app.listen(8000);
  console.log("app is running");
};

run();
