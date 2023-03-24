const Comment = require('../schemas/commentSchema')
const Case = require('../schemas/caseSchema')

const updateCaseStatus = async (req, res, next) => {
  try {
    const { id } = req.params
    const { status } = req.body
    const singleComment = await Comment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )
    if (!singleComment) {
      return res.status(404).json({ message: 'Comment not found' })
    }
    // Update the status of the case associated with the comment
    const updatedCase = await Case.findById(singleComment.case)
    await updatedCase.updateCaseStatus()
    await updatedCase.save()
    res.json(singleComment)
  } catch (err) {
    next(err)
  }
}

const createComment = async (req, res, next) => {
  try {
    const { id } = req.params
    const { email, message, status } = req.body
    const singleCase = await Case.findById(id).populate({
      path: 'comments',
      populate: { path: 'case', select: '_id' },
    })

    const newComment = new Comment({
      case: id,
      email,
      message,
      status,
    })

    await newComment.save()
    singleCase.comments.push(newComment)
    await singleCase.save()

    // Update the status of the case associated with the new comment
    await singleCase.updateCaseStatus()
    await singleCase.save()

    res.status(201).json(newComment)
  } catch (err) {
    next(err)
  }
  
}

const getCommentsByCaseId = async (req, res, next) => {
  try {
    const { id } = req.params
    const comments = await Comment.find({ case: id }).lean()
    res.json(comments)
  } catch (err) {
    // res.status(500).json({
    //   message: 'Something went wrong getting the comment',
    //   err: err.message
    // })
    next(err)
  }
}




module.exports = {
  createComment,
  getCommentsByCaseId,
  updateCaseStatus,
}



// const Comment = require('../schemas/commentSchema')

// exports.newComment = (req, res) => {

//     const {email, message } = req.body
  
  
//     Comment.create({email, message })
//         .then(data => {
//             res.status(201).json(data)
//         })
//         .catch(err => {
//             console.log({
//                 message: 'Failed to create comment',
//                 err: err.message})
//         })
//   }
  