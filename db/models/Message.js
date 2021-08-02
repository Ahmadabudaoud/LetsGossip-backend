const SequelizeSlugify = require("sequelize-slugify");

module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define("Message", {
    body: {
      type: DataTypes.STRING,
    },
  });

  SequelizeSlugify.slugifyModel(Message, {
    source: ["name"],
  });

  Message.associate = (models) => {
    models.User.hasMany(Message, {
      foreignKey: "userId",
      as: "messages",
    });

    Message.belongsTo(models.User, {
      foreignKey: "userId",
      as: "user",
    });

    models.Chat.hasMany(Message, {
      foreignKey: "chatId",
      as: "messages",
    });

    Message.belongsTo(models.Chat, {
      foreignKey: "chatId",
      as: "messages",
    });
  };
  return Message;
};
