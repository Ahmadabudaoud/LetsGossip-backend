//Model
const { FriendShip } = require("../db/models");

exports.friendShipCreate = async (req, res, next) => {
  try {
    const newFriendShip = await FriendShip.create(req.body);
    res.status(201).json(newFriendShip);
  } catch (error) {
    next(error);
  }
};

exports.friendShipList = async (req, res, next) => {
  try {
    const friendShips = await FriendShip.findAll({
      attributes: { exclude: ["createdAt"] },
    });
    res.json(friendShips);
  } catch (error) {
    next(error);
  }
};
