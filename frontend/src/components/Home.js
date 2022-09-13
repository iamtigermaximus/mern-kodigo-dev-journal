import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import styled from 'styled-components'

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: pink;
`
const NoteCard = styled.div`
  display: flex;
  flex-direction: column ;
  justify-content-center;
  padding:10px;
  background-color: pink;
  border: 1px solid black;
  width: 100%;
`

const Home = () => {
  const [notes, setNotes] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:5500/notes')
      .then((response) => {
        setNotes(response.data.notes)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])
  console.log(notes)
  return (
    <Container>
      {notes.map((note) => (
        <NoteCard>
          <h1>{note.title}</h1>
          <p>{note.content}</p>
          <h4>{note.topic}</h4>
        </NoteCard>
      ))}
    </Container>
  )
}
export default Home
