const express = require('express')
const router = express.Router()
const commentModel = require('../models/commentModel')

// Add comment to a specific case by case ID
router.post('/cases/:id/comments', commentModel.createComment)

// Get comments for a specific case by its ID
router.get('/cases/:id/comments', commentModel.getCommentsByCaseId)



module.exports = router




// const router = require('express').Router()
// const commentModel = require('../models/commentModel')

// // POST COMMENT
// router.post('/:id', commentModel.newComment)

// module.exports = router