const router = require('express').Router()
const errandModel = require('../models/errandModel')
const commentModel = require('../models/commentModel')

<<<<<<< HEAD
router
  .post('/', errandModel.newErrand)
  .get('/', errandModel.getAllErrands)
  .get('/:id', errandModel.getErrand)
  .put('/:id', errandModel.updateErrand)
  .delete('/:id', errandModel.deleteErrand)

module.exports = router
=======

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
>>>>>>> 59b9e1646e8953ea05e38833f56d5f480cd577e5
