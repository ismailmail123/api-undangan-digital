'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class card_payment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            card_payment.belongsTo(models.user, {
                foreignKey: "user_id",
                as: "user"
            })
        }
    }
    card_payment.init({
        user_id: DataTypes.INTEGER,
        title: DataTypes.STRING,
        name: DataTypes.STRING,
        number: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'card_payment',
        underscored: true,
    });
    return card_payment;
};