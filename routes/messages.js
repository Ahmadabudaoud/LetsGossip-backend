//setup
const express = require("express");
const router = express.Router();

//controllers
const {
  messageList,
  messageCreate,
} = require("../controllers/messageControllers");

router.post(
  "/",
  // passport.authenticate("jwt", { session: false }),

  messageCreate
);

router.get("/", messageList);
module.exports = router;
