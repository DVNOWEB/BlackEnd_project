const Status = require('../schemas/statusSchema')

const createStatus = async (req, res, next) => {
  try {
    const { name } = req.body
    const newStatus = new Status({ name })
    await newStatus.save()
    res.status(201).json(newStatus)
  } catch (err) {
    next(err)
  }
}

const getAllStatuses = async (req, res, next) => {
  try {
    const statuses = await Status.find()
    res.json(statuses)
  } catch (err) {
    next(err)
  }
}

const getStatusById = async (req, res, next) => {
  try {
    const { id } = req.params
    const status = await Status.findById(id)
    if (!status) {
      return res.status(404).json({ message: 'Status not found' })
    }
    res.json(status)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  createStatus,
  getAllStatuses,
  getStatusById,
}