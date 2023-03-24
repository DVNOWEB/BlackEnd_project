const mongoose = require('mongoose')
// const Comment = require('./commentModel')

const caseSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      enum: [1, 2, 3],
      default: 1,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

caseSchema.virtual('commentDetails', {
  case: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Case',
    required: true,
  },
})


caseSchema.methods.updateCaseStatus = async function () {
  if (this.comments.length === 0) {
    // If there are no comments, set the status to 1
    this.status = 1
  } else {
    // Get the latest comment
    const latestComment = await this.populate('comments')
    const { status } = latestComment.comments[latestComment.comments.length - 1]
    // Set the status of the case to the status of the latest comment
    this.status = status
  }

  return this
}




const Case = mongoose.model('Case', caseSchema)

module.exports = Case



// const mongoose = require('mongoose')

// const caseSchema = mongoose.Schema({
//     email:    {type: String, required: true},
//     subject:  {type: String, required: false},
//     message:  {type: Array, required: true},
//     status:   {type: Number, default: 1}

// }, { timestamps: true })

// // const commentSchema = mongoose.Schema({
// //     email:    {type: String, required: true},
// //     message:  {type: String, required: true}

// // }, { timestamps: true })

// module.exports = mongoose.model('Case', caseSchema)




// module.exports = mongoose.model('Comment', commentSchema)
