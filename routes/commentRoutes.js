const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentController')

// Add comment to a specific case by case ID
router.post('/cases/:id/comments', commentController.createComment)

// Get comments for a specific case by its ID
router.get('/cases/:id/comments', commentController.getCommentsByCaseId)



module.exports = router
