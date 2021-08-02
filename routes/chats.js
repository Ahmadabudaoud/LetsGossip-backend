//Setup
const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");

//Controllers
const { chatCreate, foundChat } = require("../controllers/chatControllers");

router.post(
  "/",
  // passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  chatCreate
);

router.get("/:chatId", foundChat);

module.exports = router;
