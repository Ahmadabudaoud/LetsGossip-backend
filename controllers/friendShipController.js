//Model
const { FriendShip, User } = require("../db/models");

exports.friendShipCreate = async (req, res, next) => {
  try {
    const foundFriend = await User.findOne({
      where: { username: req.body.secondUserId },
    });
    if (foundFriend) {
      req.body.secondUserId = foundFriend.id;
      const newFriendShip = await FriendShip.create(req.body);
      res.status(201).json(newFriendShip);
    } else {
      res.json({ message: "Username does not exist" });
    }
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
