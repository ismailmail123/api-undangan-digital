'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class sound extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    sound.init({
        user_id: DataTypes.INTEGER,
        title: DataTypes.STRING,
        sound_url: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'sound',
        underscored: true,
    });
    return sound;
};