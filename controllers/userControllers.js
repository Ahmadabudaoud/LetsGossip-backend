const bcrypt = require("bcrypt");
const { User, Chat, Message } = require("../db/models");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/keys");

exports.signup = async (req, res, next) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
    req.body.password = hashedPassword;
    const newUser = await User.create(req.body);
    const token = generateToken(newUser);
    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

exports.signin = (req, res, next) => {
  const token = generateToken(req.user);
  res.json({ token });
};

const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    exp: Date.now() + JWT_EXPIRATION_MS,
    isAdmin: user.isAdmin,
  };
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

exports.updateUser = async (req, res, next) => {
  try {
    const foundUser = await User.findByPk(req.body.userId);

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(
      req.body.currentpassword,
      saltRounds
    );
    req.body.currentpassword = hashedPassword;

    const match = await bcrypt.compare(hashedPassword, foundUser.password);
    console.log(hashedPassword, "2");
    console.log(foundUser.password, "1");
    if (match) {
      const newHashedPassword = await bcrypt.hash(
        req.body.password,
        saltRounds
      );
      console.log(1);
      req.body.password = newHashedPassword;
      await foundUser.update(req.body);
    } else {
      res.status(401).end();
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

exports.userList = async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ["createdAt"] },
      include: [
        {
          model: Message,
          as: "messages",
          attributes: ["id"],
        },
        {
          model: Chat,
          as: "chats",
          attributes: ["id"],
        },
        {
          model: User,
          as: "from",
          attributes: ["id"],
        },
        {
          model: User,
          as: "to",
          attributes: ["id"],
        },
      ],
    });
    res.json(users);
  } catch (error) {
    next(error);
  }
};
