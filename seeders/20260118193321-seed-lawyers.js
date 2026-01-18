'use strict';
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Lawyers', [
      {
        id: 'aaa11111-aaaa-1111-aaaa-111111111111',
        name: 'Carlos Pérez García',
        email: 'carlos.perez@bufete.com',
        phone: '+573001234567',
        specialization: 'Derecho Laboral',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'bbb22222-bbbb-2222-bbbb-222222222222',
        name: 'Ana Gómez López',
        email: 'ana.gomez@bufete.com',
        phone: '+573002345678',
        specialization: 'Derecho Civil',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'ccc33333-cccc-3333-cccc-333333333333',
        name: 'Juan Martínez Díaz',
        email: 'juan.martinez@bufete.com',
        phone: '+573003456789',
        specialization: 'Derecho Comercial',
        status: 'inactive',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'ddd44444-dddd-4444-dddd-444444444444',
        name: 'Laura Torres Sánchez',
        email: 'laura.torres@bufete.com',
        phone: '+573004567890',
        specialization: 'Derecho Penal',
        status: 'active',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        id: 'eee55555-eeee-5555-eeee-555555555555',
        name: 'Miguel Rojas Castro',
        email: 'miguel.rojas@bufete.com',
        phone: '+573005678901',
        specialization: 'Derecho Laboral',
        status: 'inactive',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ], {});
  },
  async down(queryInterface) {
    await queryInterface.bulkDelete('Lawyers', null, {});
  },
};
