//moodel
const { Chat, Message, User } = require("../db/models");

exports.chatList = async (req, res, next) => {
  try {
    const chats = await Chat.findAll({
      attributes: { exclude: ["createdAt"] },
      include: [
        {
          model: Message,
          as: "messages",
          attributes: ["id"],
        },
        {
          model: User,
          as: "users",
          attributes: { exclude: ["password", "updatedAt"] },
        },
      ],
    });
    res.json(chats);
  } catch (error) {
    next(error);
  }
};

exports.chatCreate = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    // req.body.userId = req.user.id;
    const newChat = await Chat.create(req.body);
    res.status(201).json(newChat);
  } catch (error) {
    next(error);
  }
};
