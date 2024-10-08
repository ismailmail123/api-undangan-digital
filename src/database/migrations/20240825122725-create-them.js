'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('thems', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            user_id: {
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            img_url: {
                type: Sequelize.TEXT
            },
            created_at: {
                allowNull: false,
                defaultValue: Sequelize.fn("NOW"),
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                defaultValue: Sequelize.fn("NOW"),
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('thems');
    }
};