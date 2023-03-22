const mongoose = require('mongoose')

const commentSchema = mongoose.Schema({
    email:    {type: String, required: true},
    message:  {type: Array, required: true}
    // CaseID (samma id som ärendet har?)

}, { timestamps: true })

module.exports = mongoose.model('Comment', commentSchema)