'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
await queryInterface.changeColumn ('Transactions', 'id', {
  type: Sequelize.STRING,
  allowNull: false,
  primarykey: true,
  defaultValue: Sequelize.UUIDV4
})

},

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn("Transactions", "id", {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    })
  }
};
