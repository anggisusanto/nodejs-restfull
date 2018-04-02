'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
        name: 'albert',
        email: 'albert@me.com',
        password_digest: bcrypt.hashSync('toostrong',10),
        createdAt: new Date,
        updatedAt: new Date
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
