const express = require("express");
const passport = require("passport");
const upload = require("../middleware/multer");

const {
  signup,
  signin,
  updateUser,
  userList,
  updateUserImage,
  foundUser,
} = require("../controllers/userControllers");

const router = express.Router();

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.post("/signup", signup);
// router.get("/users", userList);
router.put(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  updateUser
);
router.put(
  "/:userId/image",
  upload.single("image"),
  passport.authenticate("jwt", { session: false }),
  updateUserImage
);
router.get("/users", foundUser);
module.exports = router;
