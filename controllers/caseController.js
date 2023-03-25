const express = require('express')
const router = express.Router()
const caseModel = require('../models/caseModel')
const commentModel = require('../models/commentModel')

// Get all cases
router.get('/', caseModel.getAllCases)

// Get case by ID
router.get('/:id', caseModel.getCaseById)

// Create a new case
router.post('/', caseModel.createCase)

// // UPDATE
router.put('/:id', caseModel.updateCase)

// // DELETE
router.delete('/:id', caseModel.deleteCase)

// Get comments for a specific case by its ID
router.get('/:id/comments', commentModel.getCommentsByCaseId)

// Add comment to a specific case by case ID
router.post('/:id/comments', commentModel.createComment)

// Update status of a specific comment by comment ID
// (Will only change the case status if it is the latest comment)
router.put('/comments/:id/status', commentModel.updateCaseStatus)

module.exports = router
