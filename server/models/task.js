'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    category: DataTypes.STRING,
    description: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {});
  Task.associate = function(models) {
    // associations can be defined here
  };
  return Task;
};