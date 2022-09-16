const Note = require('../model/Note')

const getAllNotes = async (req, res, next) => {
  let notes
  try {
    notes = await Note.find()
  } catch (err) {
    console.log(err)
  }

  if (!notes) {
    return res.status(404).json({ message: 'No notes found' })
  }
  return res.status(200).json({ notes })
}

const getById = async (req, res, next) => {
  const id = req.params.id
  let note
  try {
    note = await Note.findById(id)
  } catch (err) {
    console.log(err)
  }
  if (!note) {
    return res.status(404).json({ message: 'No Note found' })
  }
  return res.status(200).json({ note })
}

const addNote = async (req, res, next) => {
  const { title, content, topic, completed, createdAt } = req.body
  let note
  try {
    note = new Note({
      title,
      content,
      topic,
      completed: false,
      createdAt: new Date(),
    })
    await note.save()
  } catch (err) {
    console.log(err)
  }

  if (!note) {
    return res.status(500).json({ message: 'Unable To Add' })
  }
  return res.status(201).json({ note })
}

const updateNote = async (req, res, next) => {
  const id = req.params.id
  const { title, content, topic, completed, createdAt } = req.body
  let note
  try {
    note = await Note.findByIdAndUpdate(id, {
      title,
      content,
      topic,
      completed: false,
      createdAt: new Date(),
    })
    note = await note.save()
  } catch (err) {
    console.log(err)
  }
  if (!note) {
    return res.status(404).json({ message: 'Unable To Update By this ID' })
  }
  return res.status(200).json({ note })
}

const deleteNote = async (req, res, next) => {
  const id = req.params.id
  let note
  try {
    note = await Note.findByIdAndRemove(id)
  } catch (err) {
    console.log(err)
  }
  if (!note) {
    return res.status(404).json({ message: 'Unable To Delete By this ID' })
  }
  return res.status(200).json({ message: 'Note Successfully Deleted' })
}

exports.getAllNotes = getAllNotes
exports.addNote = addNote
exports.getById = getById
exports.updateNote = updateNote
exports.deleteNote = deleteNote
