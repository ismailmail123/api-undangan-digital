'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class response extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            response.belongsTo(models.recipient, {
                foreignKey: "recipient_id",
                as: "recipient"
            })
        }
    }
    response.init({
        recipient_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        message: DataTypes.TEXT,
        absen: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'response',
        underscored: true,
    });
    return response;
};