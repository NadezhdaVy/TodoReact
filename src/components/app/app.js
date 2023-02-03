import React, { useState } from 'react'

import TasksList from '../tasks-list'
import NewTaskForm from '../new-task-form'
import Footer from '../footer'

import './app.css'

function App() {
  let maxId = Date.now() * 2

  const [filters, setFilters] = useState('all')
  const [tasks, setTasks] = useState([])

  const createNewTask = (value, timer = 10) => ({
    text: value,
    completed: false,
    editing: false,
    id: maxId++,
    date: new Date(),
    timer,
  })

  const addItem = (text) => {
    const textValue = text[0]
    const timeValue = text[1]
    const newItem = createNewTask(textValue, timeValue)

    setTasks((items) => [...items, newItem])
  }
  const currentFilter = (items, filter) => {
    switch (filter) {
      case 'all':
        return items
      case 'active':
        return items.filter((item) => !item.completed)
      case 'completed':
        return items.filter((item) => item.completed)
      default:
        return items
    }
  }

  function deleteTask(id) {
    setTasks((items) => {
      const index = items.findIndex((el) => el.id === id)
      return [...items.slice(0, index), ...items.slice(index + 1)]
    })
  }

  const toggleProperty = (arr, id, propName, val) => {
    const idx = arr.findIndex((el) => el.id === id)
    if (val === undefined) {
      val = arr[idx].text
    }
    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName], text: val }

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  const editTask = (id) => {
    setTasks((items) => toggleProperty(items, id, 'editing'))
  }

  const clearAllCompleted = () => {
    setTasks((items) => items.filter((el) => !el.completed))
  }

  const leftTasks = () => {
    const countActiveTasks = tasks.filter((el) => !el.completed).length
    return countActiveTasks
  }

  const completeTask = (id) => {
    setTasks((items) => toggleProperty(items, id, 'completed'))
  }

  const updateItem = (text, id) => {
    setTasks((items) => toggleProperty(items, id, 'editing', text))
  }

  const updateTimer = (id, time) => {
    setTasks((items) => {
      const checkExisting = items.find((el) => el.id === id)

      if (!checkExisting) {
        return items
      }
      const idx = items.findIndex((el) => el.id === id)

      const oldItem = items[idx]

      const newItem = { ...oldItem, timer: time }

      const newArr = [...items.slice(0, idx), newItem, ...items.slice(idx + 1)]
      return newArr
    })
  }

  const changeFilter = (filter) => {
    setFilters(filter)
  }

  const showTasks = currentFilter(tasks, filters)
  return (
    <div className="todoapp">
      <header className="header">
        <h1>Todo</h1>
        <NewTaskForm onItemAdded={(text) => addItem(text)} />
      </header>
      <main className="main">
        <TasksList
          onEdit={(id) => editTask(id)}
          onDeleted={(id) => deleteTask(id)}
          todos={showTasks}
          onCompleted={(id) => completeTask(id)}
          onItemEditing={(text, id) => updateItem(text, id)}
          startTimer={(id, time) => updateTimer(id, time)}
        />
        <Footer
          onClearAllCompleted={() => clearAllCompleted()}
          onFilterChange={(filter) => changeFilter(filter)}
          filter={filters}
          itemsLeft={() => leftTasks()}
          items={tasks}
        />
      </main>
    </div>
  )
}

export default App
