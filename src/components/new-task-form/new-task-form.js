import React from 'react'
import PropTypes from 'prop-types'

import './new-task-form.css'

export default class NewTaskForm extends React.Component {
  static defaultProps = {
    onItemAdded: () => {},
  }

  static propTypes = {
    onItemAdded: PropTypes.func,
  }

  state = { newTodo: '', min: '', sec: '' }

  convertToSeconds = (state) => {
    const { min, sec } = state
    const { newTodo } = state
    const seconds = min * 60 + Number(sec)
    return [newTodo, seconds]
  }

  handleSubmit = (event) => {
    const { onItemAdded } = this.props
    event.preventDefault()
    onItemAdded(this.convertToSeconds(this.state))
    this.setState({
      newTodo: '',
      min: '',
      sec: '',
    })
  }

  onValueChange = (e) => {
    const { value } = e.target
    const { name } = e.target
    this.setState({
      [name]: value,
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="new-todo-form">
        <input
          name="newTodo"
          type="text"
          onChange={this.onValueChange}
          value={this.state.newTodo}
          className="new-todo"
          placeholder="What needs to be done?"
          id="new-todo"
        />

        <input
          type="number"
          value={this.state.min}
          className="new-todo-form__timer"
          placeholder="Min"
          onChange={this.onValueChange}
          name="min"
        />

        <input
          value={this.state.sec}
          type="number"
          className="new-todo-form__timer"
          placeholder="Sec"
          onChange={this.onValueChange}
          name="sec"
        />

        <button aria-label="submit" type="submit" />
      </form>
    )
  }
}
