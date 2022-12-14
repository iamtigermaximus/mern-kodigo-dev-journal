import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import CreateNotes from './components/CreateNotes'
import EditNote from './components/EditNote'
import About from './components/About'
import Home from './components/Home'

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/addNote' element={<CreateNotes />} />
        <Route path='/editNote/:id' element={<EditNote />} />
        <Route path='/about' element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
