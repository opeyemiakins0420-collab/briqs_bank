"use strict";
const { ENUM } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Transactions", {
      id: {
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.INTEGER,
      },
      transaction_type: {
        type: Sequelize.ENUM("TRANSFER", "AIRTIME", "UTILITY", "DEPOSIT"),
        allowNull: false,
      },
      source_account: {
        type: Sequelize.STRING,
        references: { model: "Banks", key: "id" },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      destination_account: {
        type: Sequelize.STRING,
        references: { model: "Banks", key: "id" },
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      status: {
        type: Sequelize.ENUM("SUCCESSFUL", "PENDING", "FAILED"),
        allowNull: false,
        defaultValue: "PENDING",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Transactions");
  },
};
