const router = require('express').Router()
const usersModel = require('../models/usersModel')


router.post('/', usersModel.newSubject)
router.get('/', usersModel.getAllSubjects)
router.get('/:id', usersModel.getSubject)


module.exports = router