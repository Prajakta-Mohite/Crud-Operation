const express = require('express')
const colors = require('colors')
var cors = require('cors')
const {
    errorHandler
} = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
// const multer = require('multer')
// const ImageModel = require("./models/goalModel");
const {
    application
} = require('express');
// const {
//     setGoals
// } = require('./controllers/goalController');
const dotenv = require('dotenv').config()

const port = process.env.PORT || 5000

connectDB()

const app = express()
// const router = express.Router()
app.use(cors())
app.use('/uploads', express.static('./uploads'));

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))




//Import Router Middlewares
app.use('/api/goals', require('./routes/goalRoutes'))

// //storage 
// const Storage = multer.diskStorage({
//     destination: 'uploads',
//     filename: (req, file, cb) => {
//         cb(null, file.originalname);
//     }
// })

// const upload = multer({
//     storage: Storage
// }).single('testImage')

// app.post('/api/uploads', )

app.listen(port, () => console.log(`Server started on port ${port}`))

// app.post('/api/goals', setGoals)






app.use(errorHandler)