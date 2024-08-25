'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.addColumn('responses', 'name', {
            type: Sequelize.STRING,
            allowNull: true, // Atau false jika kolom tidak boleh null
        });
    },

    down: async(queryInterface, Sequelize) => {
        await queryInterface.removeColumn('responses', 'name');
    }
};