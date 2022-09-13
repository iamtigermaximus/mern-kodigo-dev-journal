const express = require('express')
const router = express.Router()
const Note = require('../model/Note')
const notesController = require('../controllers/notes-controllers')

router.get('/', notesController.getAllNotes)
router.post('/addNote', notesController.addNote)
router.get('/:id', notesController.getById)
router.put('/:id', notesController.updateNote)
router.delete('/:id', notesController.deleteNote)

module.exports = router
