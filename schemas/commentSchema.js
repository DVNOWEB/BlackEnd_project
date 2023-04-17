const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema(
  {
    caseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Case',
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      enum: [1, 2, 3],
      default: 1,
    },
    message: { type: String }
    
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

commentSchema.virtual('caseDetails', {
  ref: 'Case',
  localField: 'caseId',
  foreignField: '_id',
  justOne: true,
})


const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment