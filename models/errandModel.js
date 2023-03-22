const Errand = require('../schemas/errandSchema')
// const Comment = require('../schemas/commentSchema')

exports.newErrand = (req, res) => {
  const { email, subject, message, status } = req.body
  Errand.create({ email, subject, message, status })
    .then((data) => res.status(201).json(data))
    .catch((err) =>
      console.log({
        message: 'Failed to create errand',
        err: err.message,
      })
    )
}

exports.getAllErrands = (req, res) => {
  Errand.find()
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(400).console.log({
        message: 'Failed to find errands',
        err: err.message,
      })
    )
}

exports.getErrand = (req, res) => {

    Errand.findById(req.params.id)
     .then(data => {
        res.status(200).json(data)
     })
     .catch(err => res.status(400).console.log({
      message: 'Failed to get errand',
      err: err.message}))
}

exports.updateErrand = (req, res) => {
  const { status } = req.body
  if (!status)
    return res.status(400).json({ message: 'You need to update the status' })

  Errand.findByIdAndUpdate(req.params.id, { status }, { new: true })
    .then((data) => {
      if (!data)
        return res.status(404).json({ message: 'Could not find that errand' })
      res.status(200).json(data)
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Something went wrong when updating the errand',
        err: err.message,
      })
    })
}

exports.deleteErrand = (req, res) => {

  Errand.findByIdAndDelete(req.params.id)
    .then(data => {
      if(!data) {
        res.status(404).json({
          message: 'Could not find that errand'
        })
        return
      }

      res.status(200).json({ id: data._id})
    })
    .catch(err => {
      res.status(500).json({
        message: 'Something went wrong when deleting the errand',
        err: err.message
      })
    })
}

// exports.newComment = (req, res) => {

//   const {email, message } = req.body


//   Errand.create({email, message })
//       .then(data => {
//           res.status(201).json(data)
//       })
//       .catch(err => {
//           console.log({
//               message: 'Failed to create message',
//               err: err.message})
//       })
// }
