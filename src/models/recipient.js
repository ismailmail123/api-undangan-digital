'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class recipient extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            recipient.belongsTo(models.user, {
                foreignKey: "user_id",
                as: "user"
            })
            recipient.hasMany(models.response, {
                foreignKey: "recipient_id",
                as: "response"
            })
        }
    }
    recipient.init({
        user_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        number: DataTypes.STRING,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'recipient',
        underscored: true,
    });
    return recipient;
};