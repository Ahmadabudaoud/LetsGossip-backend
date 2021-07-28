"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Chats", "userId", Sequelize.INTEGER, {
      references: {
        model: {
          tableName: "Users",
          schema: "schema",
        },
        key: "id",
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Chats", "userId");
  },
};
