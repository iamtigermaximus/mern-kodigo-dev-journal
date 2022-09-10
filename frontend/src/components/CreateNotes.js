import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'
import colors from '../utils/colors'

const Container = styled.div`
  height: 100vh;
  display: flex;
  padding: 20px;
`

const CreateNotesContainer = styled.div`
  display: flex;
  flex-direction: column ;
  justify-content-center;
  padding:10px;
  background-color: pink;
  // border: 1px solid black;
  width: 100%;
`
const FormTitleContainer = styled.div`
  padding: 10px;
  margin-top: 20px;
`
const FormTitle = styled.h1`
  display: flex;
  justify-content: center;
`
const FormContainer = styled.div`
  padding: 10px;
  border: 1px solid black;
  margin: 15px 0;
`

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`
const TopicOptionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin: 10px 0;
`
const TopicContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 10px;
`
const SubmitButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;
`
const SubmitButton = styled.button`
  width: 200px;
  padding: 10px;
  border-radius: 5px;
  background: #ff6347;
  color: ${colors.offWhite};
  border: #ff6347;
`
const InputLabel = styled.label`
  margin: 10px 0;
`
const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
`
const TextArea = styled.textarea`
  padding: 10px;
  margin-bottom: 10px;
`
const RadioLabel = styled.label`
  margin-left: 5px;
`

export default function Create() {
  const [form, setForm] = useState({
    title: '',
    content: '',
    topic: '',
  })

  const navigate = useNavigate()

  // These methods will update the state properties.
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value }
    })
  }
  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault()

    // When a post request is sent to the create url, we'll add a new record to the database.
    const newNote = { ...form }

    await fetch('http://localhost:5500/notes/create-notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(newNote),
    }).catch((error) => {
      window.alert(error)
      return
    })

    setForm({ title: '', content: '', topic: '' })

    navigate('/')
  }
  // This following section will display the form that takes the input from the user.
  return (
    <Container>
      <CreateNotesContainer>
        <FormTitleContainer>
          <FormTitle>Create A Note</FormTitle>
        </FormTitleContainer>
        <FormContainer>
          <form onSubmit={onSubmit}>
            <InputContainer>
              <InputLabel htmlFor='title'>Title</InputLabel>
              <Input
                type='text'
                id='title'
                value={form.title}
                onChange={(e) => updateForm({ title: e.target.value })}
              />
            </InputContainer>
            <InputContainer>
              <InputLabel htmlFor='content'>Content</InputLabel>
              <TextArea
                rows='7'
                cols='50'
                type='text'
                id='content'
                value={form.content}
                onChange={(e) => updateForm({ content: e.target.value })}
              />
            </InputContainer>
            <TopicOptionsContainer>
              <TopicContainer>
                <input
                  type='radio'
                  name='topicOptions'
                  id='topicFrontend'
                  value='Frontend'
                  checked={form.topic === 'Frontend'}
                  onChange={(e) => updateForm({ topic: e.target.value })}
                />
                <RadioLabel
                  htmlFor='topicFrontend'
                  className='form-check-label'
                >
                  Frontend
                </RadioLabel>
              </TopicContainer>
              <div>
                <input
                  type='radio'
                  name='topicOptions'
                  id='topicBackend'
                  value='Backend'
                  checked={form.topic === 'Backend'}
                  onChange={(e) => updateForm({ topic: e.target.value })}
                />
                <RadioLabel htmlFor='topicBackend'>Backend</RadioLabel>
              </div>
              <div>
                <input
                  type='radio'
                  name='topicOthers'
                  id='topicOthers'
                  value='Others'
                  checked={form.topic === 'Others'}
                  onChange={(e) => updateForm({ topic: e.target.value })}
                />
                <RadioLabel htmlFor='topicOthers'>Others</RadioLabel>
              </div>
            </TopicOptionsContainer>
            <SubmitButtonContainer>
              <SubmitButton type='submit' value='Create'>
                Create
              </SubmitButton>
            </SubmitButtonContainer>
          </form>
        </FormContainer>
      </CreateNotesContainer>
    </Container>
  )
}
