const bcrypt = require("bcrypt");
const { User } = require("../db/models");
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
    const { userId } = req.params;

    const foundUser = await User.findByPk(userId);
    await foundUser.update(req.body);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
