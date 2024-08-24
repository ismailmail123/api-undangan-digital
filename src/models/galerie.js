'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class galerie extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            galerie.belongsTo(models.user, {
                foreignKey: "user_id",
                as: "user"
            })
        }
    }
    galerie.init({
        user_id: DataTypes.INTEGER,
        title: DataTypes.STRING,
        image: DataTypes.TEXT
    }, {
        sequelize,
        modelName: 'galerie',
        underscored: true,
    });
    return galerie;
};