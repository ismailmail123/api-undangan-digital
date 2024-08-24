'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class wedding extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            wedding.belongsTo(models.user, {
                foreignKey: "user_id",
                as: "user"
            })
        }
    }
    wedding.init({
        user_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        parthner_name: DataTypes.STRING,
        date: DataTypes.DATE,
        time: DataTypes.TIME,
        adress: DataTypes.TEXT,
        sound: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'wedding',
        underscored: true,
    });
    return wedding;
};