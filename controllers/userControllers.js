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
    image: user.image,
    fullname: user.fullname,
  };
  const token = jwt.sign(payload, JWT_SECRET);
  return token;
};

exports.updateUser = async (req, res, next) => {
  try {
    const foundUser = await User.findByPk(req.body.userId);
    const conflictUserName = await User.findOne({
      where: { username: req.body.username },
    });
    if (conflictUserName) {
      if (conflictUserName.username !== foundUser.username) {
        res
          .status(401)
          .send({ status: 401, message: "Username already exist" })
          .end();
      }
    }
    const saltRounds = 10;
    const match = await bcrypt.compare(
      req.body.currentpassword,
      foundUser.password
    );

    if (match) {
      const newHashedPassword = await bcrypt.hash(
        req.body.password,
        saltRounds
      );
      req.body.password = newHashedPassword;
      await foundUser.update(req.body);
    } else {
      res.status(402).send({ status: 402, message: "invalid password" }).end();
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

exports.updateUserImage = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = `http://${req.get("host")}/media/${req.file.filename}`;
    }
    const foundUser = await User.findByPk(req.params.userId);
    await foundUser.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
