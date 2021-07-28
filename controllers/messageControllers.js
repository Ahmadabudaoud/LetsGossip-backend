//moodel
const { Message } = require("../db/models");

exports.messageList = async (req, res, next) => {
  try {
    const messages = await Message.findAll({
      attributes: { exclude: ["createdAt"] },
    });
    res.json(messages);
  } catch (error) {
    next(error);
  }
};

exports.messageCreate = async (req, res, next) => {
  try {
    req.body.userId = req.user.id;
    const newMessage = await Message.create(req.body);
    res.status(201).json(newMessage);
  } catch (error) {
    next(error);
  }
};
