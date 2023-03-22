const router = require('express').Router()
const errandModel = require('../models/errandModel')


router.post('/', errandModel.newErrand)
router.get('/', errandModel.getAllErrands)
router.get('/:id', errandModel.getErrand)

// UPDATE
router.put('/:id', errandModel.updateErrand)

// DELETE
router.delete('/:id', errandModel.deleteErrand)


module.exports = router