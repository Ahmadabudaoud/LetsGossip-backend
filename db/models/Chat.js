module.exports = (sequelize, DataTypes) => {
  const Chat = sequelize.define("Chat", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  });

  return Chat;
};
