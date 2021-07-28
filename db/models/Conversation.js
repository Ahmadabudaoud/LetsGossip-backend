module.exports = (sequelize) => {
  const Conversation = sequelize.define("Conversation");

  Conversation.associate = (models) => {
    models.User.belongsToMany(models.Chat, {
      through: Conversation,
      foreignKey: "userId",
      as: "chats",
    });
    models.Chat.belongsToMany(models.User, {
      through: Conversation,
      foreignKey: "chatId",
    });
  };
  return Conversation;
};
