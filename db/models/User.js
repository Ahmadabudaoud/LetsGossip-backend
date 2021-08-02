module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
    },
  });

  User.associate = (models) => {
    models.User.belongsToMany(models.User, {
      through: models.FriendShip,
      foreignKey: "firstUserId",
      as: "from",
    });

    models.User.belongsToMany(models.User, {
      through: models.FriendShip,
      foreignKey: "secondUserId",
      as: "to",
    });
  };
  return User;
};
