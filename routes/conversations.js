//setup
const express = require("express");
const router = express.Router();

//controllers
const {
  conversationList,
  conversationCreate,
} = require("../controllers/conversationControllers");

router.post(
  "/",
  // passport.authenticate("jwt", { session: false }),

  conversationCreate
);

router.get("/", conversationList);

module.exports = router;
