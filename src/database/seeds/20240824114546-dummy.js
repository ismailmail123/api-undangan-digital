"use strict";

const {
    user,
    recipient,
    galerie,
    response,
    wedding,
    card_payment,
} = require("../../models");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    /**
     * @param {import('sequelize').QueryInterface} queryInterface
     * @param {import('sequelize').Sequelize} _Sequelize
     */
    async up(queryInterface, _Sequelize) {
        await user.destroy({ truncate: true });
        await recipient.destroy({ truncate: true });
        await galerie.destroy({ truncate: true });
        await response.destroy({ truncate: true });
        await wedding.destroy({ truncate: true });
        await card_payment.destroy({ truncate: true });
        await queryInterface.bulkInsert("users", [
            { id: 1, username: "JohnDoe", email: "johndoe@gmail.com", password: "$2a$12$.HOb8SlLxGN4usHDihNaQe6IFDodXO09pO6Nfi.M96XzcTJ9F1HDu", address: "Jl. Mawar No.3, Bantaeng, Sulawesi Selatan", profile_image: "https://cdn.hellosehat.com/wp-content/uploads/2021/03/736e32fa-buah-sehat-apel-650x434.jpg", cover_image: "https://cdn.hellosehat.com/wp-content/uploads/2021/03/736e32fa-buah-sehat-apel-650x434.jpg", thems_image: "https://cdn.hellosehat.com/wp-content/uploads/2021/03/736e32fa-buah-sehat-apel-650x434.jpg" },

        ]);

        await queryInterface.bulkInsert("recipients", [
            { id: 1, user_id: 1, name: "JohnDoe", number: "+6285342545607" },
        ]);

        await queryInterface.bulkInsert("galeries", [
            { id: 1, user_id: 1, title: "gambar dari galeri", image: "https://cdn.hellosehat.com/wp-content/uploads/2021/03/736e32fa-buah-sehat-apel-650x434.jpg" },

        ]);

        await queryInterface.bulkInsert("responses", [{
                id: 1,
                recipient_id: 1,
                message: "selamat menempuh hidup baru",
                absen: "hadir",
            },

        ]);
        await queryInterface.bulkInsert("weddings", [
            { id: 1, user_id: 1, name: "ismail", parthner_name: "Ifralillah Hutuba", date: "2024-09-15", time: "08:30", address: "https://www.google.com/maps/place/5%C2%B032'12.1%22S+119%C2%B055'52.0%22E/@-5.5366959,119.9285316,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-5.5366959!4d119.9311065?entry=ttu&g_ep=EgoyMDI0MDgyMS4wIKXMDSoASAFQAw%3D%3D" },

        ]);

        await queryInterface.bulkInsert("card_payments", [
            { id: 1, user_id: 1, title: "mandiri", name: "Ismail", number: "085342545607" },

        ]);

    },
    /**
     * @param {import('sequelize').QueryInterface} _queryInterface
     * @param {import('sequelize').Sequelize} _Sequelize
     */
    async down(_queryInterface, _Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};