const app = require('./app')
const mongoose = require('mongoose')
const { config } = require('dotenv')
config()

const PORT = process.env.PORT
const serverURI = `http://localhost:${PORT}`
const mongoURI = process.env.MONGO_URI

const connectToDB = async () => {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true })
    console.log('connected to db')
  } catch (err) {
    console.log(err)
  }
}

connectToDB()

app.listen(PORT, () => console.log(serverURI))
