'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('LegalCases', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('gen_random_uuid()'),
      },
      case_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      plaintiff: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      defendant: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      case_type: {
        type: Sequelize.ENUM('civil', 'criminal', 'labor', 'commercial'),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('pending', 'assigned', 'in_progress', 'resolved'),
        defaultValue: 'pending',
      },
      description: {
        type: Sequelize.TEXT,
      },
      lawyer_id: {
        type: Sequelize.UUID,
        references: {
          model: 'Lawyers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('NOW()'),
      },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable('LegalCases');
  },
};
