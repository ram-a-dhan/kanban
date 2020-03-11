'use strict';
const { hashPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Email cannot be NULL!'
        },
        notEmpty: {
          args: true,
          msg: 'Email cannot be empty!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password cannot be NULL!'
        },
        notEmpty: {
          args: true,
          msg: 'Password cannot be empty!'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: async (user) => {
        user.password = await hashPassword(user.password)
      }
    }
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Task, { foreignKey: 'userId' })
  };
  return User;
};