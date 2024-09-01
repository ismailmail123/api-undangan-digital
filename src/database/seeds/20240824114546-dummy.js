"use strict";

const {
    user,
    recipient,
    galerie,
    response,
    wedding,
    card_payment,
    them,
    sound
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
        await them.destroy({ truncate: true });
        await sound.destroy({ truncate: true });
        await queryInterface.bulkInsert("users", [
            { id: 1, username: "JohnDoe", email: "johndoe@gmail.com", password: "$2a$12$.HOb8SlLxGN4usHDihNaQe6IFDodXO09pO6Nfi.M96XzcTJ9F1HDu", address: "Jl. Mawar No.3, Bantaeng, Sulawesi Selatan", profile_image: "https://res.cloudinary.com/dwijz2qny/image/upload/v1725006479/Products/1725006469429-pengantin-kartoon.png.png", cover_image: "https://res.cloudinary.com/dwijz2qny/image/upload/v1725006479/Products/1725006478264-avatar.jpg.jpg", thems_image: "https://res.cloudinary.com/dopcawo4w/image/upload/v1724838407/Products/1724838397883-wedding2.png.png", thems_image1: "https://res.cloudinary.com/dopcawo4w/image/upload/v1724858446/Products/1724858190191-backgound1.png.png" },

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
                name: "John",
                message: "selamat menempuh hidup baru",
                absen: "hadir",
            },

        ]);
        await queryInterface.bulkInsert("weddings", [
            { id: 1, user_id: 1, name: "ismail", parthner_name: "Ifralillah Hutuba", date: "2024-09-15", time: "08:30", address: "https://www.google.com/maps/place/5%C2%B032'12.1%22S+119%C2%B055'52.0%22E/@-5.5366959,119.9285316,17z/data=!3m1!4b1!4m4!3m3!8m2!3d-5.5366959!4d119.9311065?entry=ttu&g_ep=EgoyMDI0MDgyMS4wIKXMDSoASAFQAw%3D%3D", sound: "https://res.cloudinary.com/dwijz2qny/video/upload/v1724914035/audio-backsound_2_vsbdl2.mp3" },

        ]);

        await queryInterface.bulkInsert("card_payments", [
            { id: 1, user_id: 1, title: "mandiri", name: "Ismail", number: "085342545607" },

        ]);
        await queryInterface.bulkInsert("thems", [
            { id: 1, title: "Tema 1", img_url: "https://res.cloudinary.com/dopcawo4w/image/upload/v1724838407/Products/1724838397883-wedding2.png.png" },
            { id: 2, title: "Tema 2", img_url: "https://res.cloudinary.com/dopcawo4w/image/upload/v1724858446/Products/1724858190191-backgound1.png.png" },

        ]);
        await queryInterface.bulkInsert("sounds", [
            { id: 1, title: "Sound 1", sound_url: "https://res.cloudinary.com/dwijz2qny/video/upload/v1724914035/audio-backsound_2_vsbdl2.mp3" },

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