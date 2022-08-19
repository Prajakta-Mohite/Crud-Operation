//  const express = require('express')
//  const {
//      getGoals,
//      setGoals,
//      updateGoals,
//      deleteGoals
//  } = require('../controllers/goalController')
//  const router = express.Router()

//  router.get('/', getGoals)

//  router.post('/', (req,res)=>{console.log(req.body)})

//  router.put('/:id', updateGoals)

//  router.delete('/:id', deleteGoals)

//  module.exports = router

const express = require("express");
const router = express.Router();
const {
    getGoals,
    updateGoals,
    deleteGoals,
    uploadImage,
    getEmpByID
} = require('../controllers/goalController')
router.get('/', getGoals)

// router.post('/', setGoals)

router.put('/:id', updateGoals)

router.delete('/:id', deleteGoals)

router.post('/image', uploadImage)


router.get('/ById/:id', getEmpByID)

module.exports = router;