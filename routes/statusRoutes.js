const express = require('express')
const router = express.Router()
const statusController = require('../controllers/statusController')

// Get all statuses
router.get('/', statusController.getAllStatuses)

// Get status by id
router.get('/:id', statusController.getStatusById)

module.exports = router