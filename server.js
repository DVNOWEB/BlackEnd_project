const app = require('./app')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()


// SERVER

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

// Connect to database
const connectToDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      console.log('connected to db')
    } catch (err) {
      console.log(err)
    }
  }
  connectToDB()


// const PORT = process.env.PORT
// const serverURI = `http://localhost:${PORT}`
// const mongoURI = process.env.MONGO_URI

// app.listen(PORT,() => console.log(serverURI))

// const connecToDB = async () => {
//     try {
//     await mongoose.connect(mongoURI)
//     console.log('connected to db')
// }catch (err) {
//     console.log(err)
// }

// }

// connecToDB()