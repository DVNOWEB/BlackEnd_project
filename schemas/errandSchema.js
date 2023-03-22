const mongoose = require('mongoose')

const errandSchema = mongoose.Schema({
    email:    {type: String, required: true},
    subject:  {type: String, required: true},
    message:  {type: Array, required: true},
    status:   {type: Number, default: 1}

}, { timestamps: true })

module.exports = mongoose.model('Errand', errandSchema)



// const commentSchema = mongoose.Schema({
//     email:    {type: String, required: true},
//     message:  {type: String, required: true}

// }, { timestamps: true })

// module.exports = mongoose.model('Comment', commentSchema)
