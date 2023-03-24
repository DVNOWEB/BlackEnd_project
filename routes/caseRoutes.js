// const express = require('express')
// const router = express.Router()
// const caseController = require('../controllers/caseController')
// const commentController = require('../controllers/commentController')


// // Get all cases
// router.get('/', caseController.getAllCases)

// // Get case by ID
// router.get('/:id', caseController.getCaseById)

// // Kreate a new case
// router.post('/', caseController.createCase)

// // Get comments for a specific case by its ID
// router.get('/:id/comments', commentController.getCommentsByCaseId)

// // Add comment to a specific case by case ID
// router.post('/:id/comments', commentController.createComment)

// // Put status to a specific comment by case 
// router.put('/:id/status', caseController.updateCaseStatus)

// module.exports = router

const express = require('express')
const router = express.Router()
const caseController = require('../controllers/caseController')
const commentController = require('../controllers/commentController')

// Get all cases
router.get('/', caseController.getAllCases)

// Get case by ID
router.get('/:id', caseController.getCaseById)

// Create a new case
router.post('/', caseController.createCase)

// Get comments for a specific case by its ID
router.get('/:id/comments', commentController.getCommentsByCaseId)

// Add comment to a specific case by case ID
router.post('/:id/comments', commentController.createComment)

// Update status of a specific comment by comment ID
router.put('/comments/:id/status', commentController.updateCaseStatus)

module.exports = router


