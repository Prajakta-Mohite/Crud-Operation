const multer = require("multer");
const {
    db
} = require("../models/goalModel");


const Storage = multer.diskStorage({
    destination: 'upload',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})