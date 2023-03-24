const express = require('express')
const router = express.Router()
const statusModel = require('../models/statusModel')

// Get all statuses
router.get('/', statusModel.getAllStatuses)

// Get status by id
router.get('/:id', statusModel.getStatusById)

module.exports = router