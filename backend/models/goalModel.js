const mongoose = require('mongoose')

const goalSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter the field']
    },
    mobile: {
        type: Number
    },
    email: {
        type: String,
        required: [true, 'Please enter valid email']
    },
    photo: {
        // data: Buffer,
        // contentType: String
        type: String,
        // require: [true, 'Please enter valid image']

    }

})

module.exports = mongoose.model('Employee', goalSchema)