import React, { useState } from 'react'
import { useNavigate } from 'react-router'

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
    const newPerson = { ...form }

    await fetch('http://localhost:5500/notes/create-notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPerson),
    }).catch((error) => {
      window.alert(error)
      return
    })

    setForm({ title: '', content: '', topic: '' })
    navigate('/')
  }
  // This following section will display the form that takes the input from the user.
  return (
    <div>
      <h3>Create A Note</h3>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='title'>Name</label>
          <input
            type='text'
            className='form-control'
            id='title'
            value={form.title}
            onChange={(e) => updateForm({ title: e.target.value })}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='content'>Position</label>
          <input
            type='text'
            className='form-control'
            id='content'
            value={form.content}
            onChange={(e) => updateForm({ content: e.target.value })}
          />
        </div>
        <div className='form-group'>
          <div className='form-check form-check-inline'>
            <input
              className='form-check-input'
              type='radio'
              name='topicOptions'
              id='topicFrontend'
              value='Frontend'
              checked={form.topic === 'Frontend'}
              onChange={(e) => updateForm({ topic: e.target.value })}
            />
            <label htmlFor='topicFrontend' className='form-check-label'>
              Frontend
            </label>
          </div>
          <div className='form-check form-check-inline'>
            <input
              className='form-check-input'
              type='radio'
              name='topicOptions'
              id='topicBackend'
              value='Backend'
              checked={form.topic === 'Backend'}
              onChange={(e) => updateForm({ topic: e.target.value })}
            />
            <label htmlFor='topicBackend' className='form-check-label'>
              Backend
            </label>
          </div>
          <div className='form-check form-check-inline'>
            <input
              className='form-check-input'
              type='radio'
              name='topicOptions'
              id='topicOther'
              value='Other'
              checked={form.topic === 'Other'}
              onChange={(e) => updateForm({ topic: e.target.value })}
            />
            <label htmlFor='topicOther' className='form-check-label'>
              Other
            </label>
          </div>
        </div>
        <div className='form-group'>
          <input type='submit' value='Create' className='btn btn-primary' />
        </div>
      </form>
    </div>
  )
}
