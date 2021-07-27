"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Conversations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        reference: {
          tableName: "Users",
        },
        key: "id",
        allowNull: false,
      },
      chatId: {
        type: Sequelize.INTEGER,
        reference: {
          tableName: "Chats",
        },
        key: "id",
        allowNull: false,
      },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
      createdAt: { allowNull: false, type: Sequelize.DATE },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Conversations");
  },
};
