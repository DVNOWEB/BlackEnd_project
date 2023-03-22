const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/errand', require ('./controllers/errandController'))
// app.use('/api/errand', require  ('./controllers/commentController'))

module.exports = app