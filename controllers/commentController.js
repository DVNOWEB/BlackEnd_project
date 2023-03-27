const express = require('express')
const router = express.Router()
const commentModel = require('../models/commentModel')

// Add comment to a specific case by case ID
router.post('/:id/comments', commentModel.createComment)

// Get comments for a specific case by its ID
router.get('/:id/comments', commentModel.getCommentsByCaseId)

module.exports = router