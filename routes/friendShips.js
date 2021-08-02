//Setup
const express = require("express");
const router = express.Router();

//Controllers
const {
  friendShipCreate,
  friendShipList,
} = require("../controllers/friendShipController");

router.post(
  "/",
  // passport.authenticate("jwt", { session: false }),
  friendShipCreate
);

router.get("/", friendShipList);

module.exports = router;
