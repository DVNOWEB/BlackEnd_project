const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
  {
    case: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Case',
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: Number,
      enum: [1, 2, 3],
      default: 1,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

commentSchema.virtual('caseDetails', {
  ref: 'Case',
  localField: 'case',
  foreignField: 'id',
  justOne: true,
})


const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment



// const mongoose = require('mongoose')

// const commentSchema = mongoose.Schema({
//     email:    {type: String, required: true},
//     message:  {type: Array, required: true}
//     // CaseID (samma id som ärendet har?)

// }, { timestamps: true })

// module.exports = mongoose.model('Case', commentSchema)