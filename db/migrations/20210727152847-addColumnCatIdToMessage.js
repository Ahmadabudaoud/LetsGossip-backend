"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Messages", "chatId", Sequelize.INTEGER, {
      references: {
        model: {
          tableName: "Chats",
          schema: "schema",
        },
        key: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Messages", "chatId");
  },
};
