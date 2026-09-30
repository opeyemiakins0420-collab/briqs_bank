'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn ("Users", "marital_staus")
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn ("Users", "marital_staus")
  }
};
