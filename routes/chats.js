//setup
const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");

//controllers
const { chatList, chatCreate } = require("../controllers/chatControllers");

router.post(
  "/",
  // passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  chatCreate
);

router.get("/", chatList);
module.exports = router;
