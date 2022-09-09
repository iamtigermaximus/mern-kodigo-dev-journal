const express = require('express')

// notesRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /notes.
const notesRoutes = express.Router()

// This will help us connect to the database
const dbo = require('../db/conn')

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require('mongodb').ObjectId

// This section will help you get a list of all the notes.
notesRoutes.route('/notes').get(function (req, res) {
  let db_connect = dbo.getDb('kodigo_data')
  db_connect
    .collection('user_notes')
    .find({})
    .toArray(function (err, result) {
      if (err) throw err
      res.json(result)
    })
})
// This section will help you get a single note by id
notesRoutes.route('/notes/:id').get(function (req, res) {
  let db_connect = dbo.getDb()
  let myquery = { _id: ObjectId(req.params.id) }
  db_connect.collection('user_notes').findOne(myquery, function (err, result) {
    if (err) throw err
    res.json(result)
  })
})

// This section will help you create a new note.
notesRoutes.route('/notes/create-notes').post(function (req, response) {
  let db_connect = dbo.getDb()
  let myobj = {
    title: req.body.title,
    content: req.body.content,
    topic: req.body.topic,
  }
  db_connect.collection('user_notes').insertOne(myobj, function (err, res) {
    if (err) throw err
    response.json(res)
  })
})
// This section will help you update a note by id.
notesRoutes.route('/update/:id').post(function (req, response) {
  let db_connect = dbo.getDb()
  let myquery = { _id: ObjectId(req.params.id) }
  let newvalues = {
    $set: {
      title: req.body.title,
      content: req.body.content,
      topic: req.body.topic,
    },
  }
  db_connect
    .collection('user_notes')
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err
      console.log('1 document updated')
      response.json(res)
    })
})

// This section will help you delete a note
notesRoutes.route('/:id').delete((req, response) => {
  let db_connect = dbo.getDb()
  let myquery = { _id: ObjectId(req.params.id) }
  db_connect.collection('user_notes').deleteOne(myquery, function (err, obj) {
    if (err) throw err
    console.log('1 document deleted')
    response.json(obj)
  })
})

module.exports = notesRoutes
