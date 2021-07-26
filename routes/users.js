const express = require("express");
const passport = require("passport");
const upload = require("../middleware/multer");

const {
  signup,
  signin,
  updateUser,
} = require("../controllers/userControllers");

const router = express.Router();

router.post(
  "/signin",
  passport.authenticate("local", { session: false }),
  signin
);
router.post("/signup", signup);

router.put(
  "/:userId",
  passport.authenticate("jwt", { session: false }),
  updateUser
);
module.exports = router;