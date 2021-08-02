//Setup
const express = require("express");
const passport = require("passport");
const upload = require("../middleware/multer");

//Controllers
const {
  signup,
  signin,
  updateUser,
  userList, //Remove unused import
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
// router.get("/users", userList); //Remove unused code
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

router.get("/users/:userId", foundUser);

module.exports = router;
