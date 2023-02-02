import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

function NewTaskForm({ onItemAdded }) {
  const [newItem, setNewItem] = useState({ newTodo: '', min: '', sec: '' })

  const convertToSeconds = (state) => {
    const { newTodo, min, sec } = state
    const seconds = min * 60 + Number(sec)
    return [newTodo, seconds]
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (newItem.newTodo.trim()) {
      onItemAdded(convertToSeconds(newItem))
      setNewItem({
        newTodo: '',
        min: '',
        sec: '',
      })
    }
  }

  const onValueChange = (e) => {
    const { value, name } = e.target
    setNewItem((item) => ({ ...item, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="new-todo-form">
      <input
        name="newTodo"
        type="text"
        onChange={onValueChange}
        value={newItem.newTodo}
        className="new-todo"
        placeholder="What needs to be done?"
        id="new-todo"
      />

      <input
        type="number"
        min={0}
        max={60}
        value={newItem.min}
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={onValueChange}
        name="min"
      />

      <input
        value={newItem.sec}
        type="number"
        min={0}
        max={60}
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={onValueChange}
        name="sec"
      />

      <button aria-label="submit" type="submit" />
    </form>
  )
}

NewTaskForm.defaultProps = {
  onItemAdded: () => {},
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
}

export default NewTaskForm
