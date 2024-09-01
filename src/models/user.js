'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            user.hasMany(models.recipient, {
                foreignKey: "user_id",
                as: "recipient"
            })
            user.hasMany(models.galerie, {
                foreignKey: "user_id",
                as: "galerie"
            })
            user.hasOne(models.wedding, {
                foreignKey: "user_id",
                as: "wedding"
            })
            user.hasMany(models.card_payment, {
                foreignKey: "user_id",
                as: 'cardpayment'
            })
        }
    }
    user.init({
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        address: DataTypes.STRING,
        profile_image: DataTypes.TEXT,
        cover_image: DataTypes.TEXT,
        thems_image: DataTypes.TEXT,
        thems_image1: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'user',
        underscored: true,
    });
    return user;
};