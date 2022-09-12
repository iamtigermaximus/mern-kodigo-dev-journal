const mongoose = require('mongoose')

const Schema = mongoose.Schema

const noteSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
  },
})

module.exports = mongoose.model('Note', noteSchema)

// notes
