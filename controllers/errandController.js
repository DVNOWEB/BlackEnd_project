const router = require('express').Router()
const errandModel = require('../models/errandModel')

router
  .post('/', errandModel.newErrand)
  .get('/', errandModel.getAllErrands)
  .get('/:id', errandModel.getErrand)
  .put('/:id', errandModel.updateErrand)
  .delete('/:id', errandModel.deleteErrand)

module.exports = router
