module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define("Chat", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
  });

  return Chat;
};
