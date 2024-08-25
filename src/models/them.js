'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class them extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  them.init({
    user_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    img_url: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'them',
    underscored: true,
  });
  return them;
};