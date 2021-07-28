//Libraries requires
const express = require("express");
const cors = require("cors");
const passport = require("passport");
//Middlewares requires
const { localStrategy } = require("./middleware/passport");
const { jwtStrategy } = require("./middleware/passport");
//Routes requires
const userRoutes = require("./routes/users");
const chatRoutes = require("./routes/chats");
const messageRoutes = require("./routes/messages");
const conversationRoutes = require("./routes/conversations");
const friendShipRoutes = require("./routes/friendShips");
const app = express();
app.use(passport.initialize());
passport.use(localStrategy);
passport.use(jwtStrategy);
app.use(express.json());
app.use(cors());
app.use("/media", express.static("media"));

//App.user routes
app.use(userRoutes);
app.use("/chats", chatRoutes);
app.use("/messages", messageRoutes);
app.use("/conversations", conversationRoutes);
app.use("/friends", friendShipRoutes);
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
