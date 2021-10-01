//setup
const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");

//controllers
const {
  chatCreate,
  foundChat,
  updateChatImage,
} = require("../controllers/chatControllers");
const passport = require("passport");

router.post(
  "/",
  // passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  chatCreate
);

router.put(
  "/:chatId/image",
  upload.single("image"),
  passport.authenticate("jwt", { session: false }),
  updateChatImage
);

router.get("/:chatId", foundChat);
module.exports = router;
