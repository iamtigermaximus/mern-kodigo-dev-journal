const express = require('express')
const mongoose = require('mongoose')
const router = require('./routes/note-routes')
const cors = require('cors')
require('dotenv').config({ path: './config.env' })

const ATLAS_URI = process.env.ATLAS_URI
const app = express()

// Middlewares
app.use(express.json())
app.use(cors())
app.use('/notes', router) // localhost:5000/notes

mongoose
  .connect(process.env.ATLAS_URI)
  .then(() => console.log('Connected To Database'))
  .then(() => {
    app.listen(5500)
  })
  .catch((err) => console.log(err))
