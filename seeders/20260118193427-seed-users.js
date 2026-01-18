'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Users', [
      {
        id: '11111111-1111-1111-1111-111111111111',
        username: 'admin',
        password: await bcrypt.hash('Admin123!', 10),
        role: 'admin',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: '22222222-2222-2222-2222-222222222222',
        username: 'operator',
        password: await bcrypt.hash('Oper123!', 10),
        role: 'operator',
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
