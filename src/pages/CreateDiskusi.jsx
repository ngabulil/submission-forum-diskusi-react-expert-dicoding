import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createThreadAsyncAction } from '../states/threadsAndUsers/action'
import { useNavigate } from 'react-router-dom'

const CreateDiskusi = () => {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [category, setCategory] = useState('')
  const { createThread } = useSelector((state) => state.threadsAndUsers)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createThreadAsyncAction({ title, body, category }))
  }

  useEffect(() => {
    if (createThread) {
      navigate('/')
    }
  }, [createThread])
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <label htmlFor="">body</label>
        <input type="text" value={body} onChange={(e) => setBody(e.target.value)} />
        <label htmlFor="">category</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} />
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default CreateDiskusi