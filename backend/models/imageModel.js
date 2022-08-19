const mongoose = require('mongoose')

const ImageSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the field']
    },
    image: {
        data: Buffer,
        contentType: String
    }


})

module.exports = ImageModel = mongoose.model('ImageModel', ImageSchema)