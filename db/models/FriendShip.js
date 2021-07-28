module.exports = (sequelize) => {
  const FriendShip = sequelize.define("FriendShip");

  FriendShip.associate = (models) => {
    models.User.belongsToMany(models.User, {
      through: FriendShip,
      foreignKey: "firstUserId",
      as: "friends",
    });
    models.User.belongsToMany(models.User, {
      through: FriendShip,
      foreignKey: "secondUserId",
      as: "friendss",
    });
  };
  return FriendShip;
};
