require('dotenv').config()

const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "Products",
        allowedFormats: ["jpeg", "png", "jpg", "mp3", "wav"], // Tambahkan format audio yang diizinkan
        resource_type: "auto",
    },
});

module.exports = {
    cloudinary,
    storage,
};

// const cloudinary = require("cloudinary").v2;
// const { CloudinaryStorage } = require("multer-storage-cloudinary");

// cloudinary.config({
//     cloud_name: process.env.CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_KEY,
//     api_secret: process.env.CLOUDINARY_SECRET,
// });


// const storage = new CloudinaryStorage({
//     cloudinary,
//     params: {
//         folder: "Products",
//         format: async(req, file) => {
//             const formats = ['jpeg', 'png', 'jpg'];
//             const extension = file.originalname.split('.').pop().toLowerCase();
//             if (!formats.includes(extension)) {
//                 throw new Error('Format gambar tidak valid');
//             }
//             return extension;
//         },
//         public_id: (req, file) => {
//             return Date.now() + '-' + file.originalname;
//         },
//     },
// });

// module.exports = {
//     cloudinary,
//     storage,
// };