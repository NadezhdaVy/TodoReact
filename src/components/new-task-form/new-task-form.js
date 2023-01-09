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

  state = {
    value: '',
  }

  onValueChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onItemAdded(this.state.value)
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          type="text"
          onChange={this.onValueChange}
          className="new-todo"
          placeholder="What needs to be done?"
          id="new-todo"
        />
      </form>
    )
  }
}
