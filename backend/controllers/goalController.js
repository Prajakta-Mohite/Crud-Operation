const multer = require("multer");
const path = require("path");
const goalModel = require('../models/goalModel');
const {
    multi_upload
} = require("../helpers/FileUpload");

const Employee = require('../models/goalModel')



//Get All Employee Data
const getGoals = async (req, res) => {
    const employee = await Employee.find()
    res.status(200).json(employee)
}

//Get data by ID
const getEmpByID = async (req, res) => {
    const employeeID = await Employee.findById(req.params.id)
    res.status(200).json(employeeID)
}


//Add Name,Email,Mobile no.,Upload Image
const uploadImage = (req, res) => {


    //storage 
    const Storage = multer.diskStorage({

        destination: 'uploads',
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },

    })

    const upload = multer({
        storage: Storage
    }).single('testImage')



    upload(req, res, (err) => {

        if (err) {
            console.log("error")
            console.log(err)
        } else {

            const newImage = new goalModel({
                name: req.body.name,
                mobile: req.body.mobile,
                email: req.body.email,
                photo: "http://localhost:7000/uploads/" + req.file.filename
            })
            newImage.save()
                .then(() => res.send('successfully uploaded')).catch(err => console.log(err))
        }
    })
}


//Update Name,Email,Mobile no.,Upload Image
const updateGoals = async (req, res) => {

    //storage 
    const Storage = multer.diskStorage({

        destination: 'uploads',
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },

    })

    const upload = multer({
        storage: Storage
    }).single('testImage')

    upload(req, res, (err) => {

        if (err) {
            console.log("error")
            console.log(err)
        } else {

            const updatedEmployee = goalModel.findOneAndUpdate(req.params.id, {
                    name: req.body.name,
                    mobile: req.body.mobile,
                    email: req.body.email,
                    photo: "http://localhost:7000/uploads/" + req.file.filename
                })


                .then(() => res.send('successfully uploaded')).catch(err => console.log(err))

        }
    })
}


//Delete Employee
const deleteGoals = async (req, res) => {

    const employee = Employee.findById(req.params.id)
    if (!employee) {
        res.status(400)
        throw new Error("Employee not found")
    }
    const deleteEmployee = await Employee.findByIdAndDelete(req.params.id)


    res.status(200).json({
        message: `Employee Deleted Successfully`
    })
}



module.exports = {
    getGoals,
    getEmpByID,
    updateGoals,
    uploadImage,
    deleteGoals
}






//Old code of Add Employee
// const setGoals = async (req, res) => {

//     if (!req.body) {
//         res.status(400)
//         throw new Error("Please add a text filed")
//     }
//     multi_upload(req, res, async function (err) {
//         let email = req.body.email;
//         let oldemail = await goalModel.findOne({
//             email: req.body.email
//         });

//         if (oldemail) {
//             return res.json({
//                 err: 2,

//                 message: "User Already Exist. Please Login"
//             });
//         } else {

//             const employee = Employee.create({
//                 name: req.body.name,
//                 email: req.body.email,
//                 mobile: req.body.mobile,
//                 photo: req.body.photo,
//             })
//             res.status(200).json({
//                 message: 'Employee added Successfully',
//             })
//         }
//     })
// }


//old update command
// const updateGoals = async (req, res) => {


//     const employee = Employee.findById(req.params.id)
//     if (!employee) {
//         res.status(400)
//         throw new Error("Employee not found")
//     }


//     const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
//         new: true,
//     }, )

//     res.status(200).json([message = 'Updated Successfully'])
// }


// const setGoals = async (req, res) => {

//     if (!req.body) {
//         res.status(400)
//         throw new Error("Please add a text filed")
//     }
//     multi_upload(req, res, async function (err) {
//         console.log(req.files);
//         console.log(req.files[0].filename);
//         let email = req.body.email;
//         let oldemail = await goalModel.findOne({
//             email: req.body.email
//         });

//         if (oldemail) {
//             return res.json({
//                 err: 2,
//                 message: "User Already Exist. Please Login"
//             });
//         } else {

//             const employee = Employee.create(
//                 req.body
//             )
//             res.json({

//                 message: 'Employee added Successfully',
//             })
//         }
//     })



// }