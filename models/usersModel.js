const User = require('../schemas/usersSchema')


exports.newSubject = (req, res) => {

    const {email, subject, message, status } = req.body


    User.create({email, subject, message, status })
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            console.log({
                message: 'Failed to create subject',
                err: err.message})
        })
}

exports.getAllSubjects = (req, res) => {
    
    User.find()
     .then(data => res.status(200).json(data))
     .catch(err => res.status(400).console.log({
        message: 'Failed to find subjects',
        err: err.message}))
}

exports.getSubject = (req, res) => {

    User.findById(req.params.id)
     .then(data => {
        res.status(200).json(data)
     })
}


exports.deleteErrand = (req, res) => {
    
    User.findByIdAndDelete(res.params.id)
      .then(data => {
        if(!data) {
            res.status(400).json({
                message: 'Could not find that errand'
            }) 
            return
        }
       
        res.status(200).json({ id: data._id})
      })
      
      .catch(err => {
        res.status(500).json({
            message: 'Something went wrong with deleting the errand',
            err: err.message
        })
      })
}
