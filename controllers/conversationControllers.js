//moodel
const { Conversation } = require("../db/models");

exports.conversationList = async (req, res, next) => {
  try {
    const conversations = await Conversation.findAll({
      attributes: { exclude: ["createdAt"] },
    });
    res.json(conversations);
  } catch (error) {
    next(error);
  }
};

exports.conversationCreate = async (req, res, next) => {
  try {
    const newConversation = await Conversation.create(req.body);
    res.status(201).json(newConversation);
  } catch (error) {
    next(error);
  }
};
