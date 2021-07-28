"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("FriendShips", {
      firstUserId: {
        type: Sequelize.INTEGER,
        reference: {
          tableName: "Users",
        },
        key: "id",
        allowNull: false,
      },
      secondUserId: {
        type: Sequelize.INTEGER,
        reference: {
          tableName: "Users",
        },
        key: "id",
        allowNull: false,
      },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
      createdAt: { allowNull: false, type: Sequelize.DATE },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("FriendShips");
  },
};
