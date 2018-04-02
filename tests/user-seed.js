'use strict';
const bcrypt = require('bcrypt');

module.exports = (models) => {
    return models.User.create({
        name: 'albert',
        email: 'albert@me.com',
        password_digest: bcrypt.hashSync('toostrong',10),
        createdAt: new Date,
        updatedAt: new Date
      });
};

