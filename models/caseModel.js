const Case = require('../schemas/caseSchema')
// const mongoose = require('mongoose')


exports.createCase = async (req, res, next) => {
  try {
    const { email, subject, message } = req.body
    const newCase = new Case({
      email,
      subject,
      message,
      status: 1, // Default status
    })
    await newCase.save()
    res.status(201).json(newCase)
  } catch (err) {
    next(err)
  }
}

exports.getAllCases = async (req, res, next) => {
  try {
    const cases = await Case.find().populate('comments').populate('status')
    res.json(cases)
  } catch (err) {
    next(err)
  }
}

exports.getCaseById = async (req, res, next) => {
  try {
    const { id } = req.params
    const singleCase = await Case.findById(id)
      .populate('comments')
      .populate('status')
    if (!singleCase) {
      return res.status(404).json({ message: 'Case not found' })
    }
    res.json(singleCase)
  } catch (err) {
    next(err)
  }
}


exports.updateCaseStatus = async (req, res, next) => {
  try {
    const { id } = req.params
    const { status } = req.body
    const singleCase = await Case.findById(id)
    if (!singleCase) {
      return res.status(404).json({ message: 'Case not found' })
    }
    singleCase.updateCaseStatus(status)
    res.json(singleCase)
  } catch (err) {
    next(err)
  }
}

exports.updateCase = (req, res) => {

    const { status } = req.body;
    if(!status) {
      res.status(400).json({
        message: 'You need to update the status'
      })
      return
    }

    Case.findByIdAndUpdate(req.params.id, { status }, { new: true })
    .then(data => {
      if(!data) {
        res.status(404).json({
          message: 'Could not find that Case'
        })
        return
      }

      res.status(200).json(data)
    })
    .catch(err => {
      res.status(500).json({
        message: 'Something went wrong when updating the Case',
        err: err.message
      })
    })
}

exports.deleteCase = (req, res) => {

  Case.findByIdAndDelete(req.params.id)
    .then(data => {
      if(!data) {
        res.status(404).json({
          message: 'Could not find that Case'
        })
        return
      }

      res.status(200).json({ id: data._id})
    })
    .catch(err => {
      res.status(500).json({
        message: 'Something went wrong when deleting the Case',
        err: err.message
      })
    })
}
