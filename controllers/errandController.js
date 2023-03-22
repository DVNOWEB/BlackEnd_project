const router = require('express').Router()
const errandModel = require('../models/errandModel')
const commentModel = require('../models/commentModel')


// POST ERRAND
router.post('/', errandModel.newErrand)

// // POST COMMENT
router.post('/:id', commentModel.newComment)


router.get('/', errandModel.getAllErrands)
router.get('/:id', errandModel.getErrand)

// UPDATE
router.put('/:id', errandModel.updateErrand)

// DELETE
router.delete('/:id', errandModel.deleteErrand)


module.exports = router