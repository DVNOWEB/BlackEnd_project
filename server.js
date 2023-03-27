const app = require('./app')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT || 8080
const serverURI = `http://localhost:${PORT}`
const mongoURI = process.env.MONGO_URI

app.listen(PORT,() => console.log('Server is running on ' + serverURI))

const connecToDB = async () => {
  try {
  await mongoose.connect(mongoURI)
  console.log('connected to db')
  }
  catch (err) {
  console.log(err)
  }
}

connecToDB()