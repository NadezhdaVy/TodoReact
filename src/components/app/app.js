import React from 'react'

import TasksList from '../tasks-list'
import NewTaskForm from '../new-task-form'
import Footer from '../footer'

import './app.css'

export default class App extends React.Component {
  maxId = 1000

  state = {
    items: [
      this.createNewTask('Completed task'),
      this.createNewTask('Editing task'),
      this.createNewTask('Active task'),
    ],
    filter: 'all',
  }

  componentDidMount() {
    this.timerID = 0
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
    this.timerID = 0
  }

  addItem = (text) => {
    const textValue = text[0]
    const timeValue = text[1]
    if (textValue.trim()) {
      const newItem = this.createNewTask(textValue, timeValue)

      this.setState(({ items }) => {
        const newArr = [...items, newItem]
        return {
          items: newArr,
        }
      })
    }
  }

  currentFilter = (items, filter) => {
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

  deleteTask = (id) => {
    this.setState(({ items }) => {
      const index = items.findIndex((el) => el.id === id)
      const newArr = [...items.slice(0, index), ...items.slice(index + 1)]
      return {
        items: newArr,
      }
    })
  }

  editTask = (id) => {
    this.setState(({ items }) => ({
      items: this.toggleProperty(items, id, 'editing'),
    }))
  }

  clearAllCompleted = () => {
    this.setState(({ items }) => {
      const newArr = items.filter((el) => !el.completed)
      return {
        items: newArr,
      }
    })
  }

  leftTasks = () => {
    const countActiveTasks = this.state.items.filter((el) => !el.completed).length
    return countActiveTasks
  }

  completeTask = (id) => {
    this.setState(({ items }) => ({
      items: this.toggleProperty(items, id, 'completed'),
    }))
  }

  updateItem = (text, id) => {
    this.setState(({ items }) => ({
      items: this.toggleProperty(items, id, 'editing', text),
    }))
  }

  updateTimer = (id, time) => {
    this.setState(({ items }) => {
      const idx = items.findIndex((el) => el.id === id)

      const oldItem = items[idx]

      const newItem = { ...oldItem, timer: time }

      return { items: [...items.slice(0, idx), newItem, ...items.slice(idx + 1)] }
    })
  }

  createNewTask(value, timer = 0) {
    return {
      text: value,
      completed: false,
      editing: false,
      id: this.maxId++,
      date: new Date(),
      timer,
      timerIsActive: false,
    }
  }

  changeFilter(filter) {
    this.setState({ filter })
  }

  toggleProperty(arr, id, propName, val) {
    const idx = arr.findIndex((el) => el.id === id)
    if (val === undefined) {
      val = arr[idx].text
    }
    const oldItem = arr[idx]
    const newItem = { ...oldItem, [propName]: !oldItem[propName], text: val }

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  render() {
    const showTasks = this.currentFilter(this.state.items, this.state.filter)
    return (
      <div className="todoapp">
        <header className="header">
          <h1>Todo</h1>
          <NewTaskForm onItemAdded={(text) => this.addItem(text)} />
        </header>
        <main className="main">
          <TasksList
            onEdit={(id) => this.editTask(id)}
            onDeleted={(id) => this.deleteTask(id)}
            todos={showTasks}
            onCompleted={(id) => this.completeTask(id)}
            onItemEditing={(text, id) => this.updateItem(text, id)}
            startTimer={(id, time) => this.updateTimer(id, time)}
          />
          <Footer
            onClearAllCompleted={() => this.clearAllCompleted()}
            onFilterChange={(filter) => this.changeFilter(filter)}
            filter={this.state.filter}
            itemsLeft={() => this.leftTasks()}
            items={this.state.items}
          />
        </main>
      </div>
    )
  }
}
