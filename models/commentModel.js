const Comment = require('../schemas/commentSchema')

exports.newComment = (req, res) => {

    const {email, message } = req.body
  
  
    Comment.create({email, message })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            console.log({
                message: 'Failed to create comment',
                err: err.message})
        })
  }
  