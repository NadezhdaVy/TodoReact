import React from 'react'
import PropTypes from 'prop-types'

import './edit-task.css'

export default class EditTask extends React.Component {
  static defaultProps = {
    onItemEditing: () => {},
  }

  static propTypes = {
    onItemEditing: PropTypes.func,
    task: PropTypes.object.isRequired,
  }

  state = {
    value: this.props.task.text,
  }

  onValueChange = (e) => {
    this.setState({
      value: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onItemEditing(this.state.value, this.props.task.id)
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" className="edit" value={this.state.value} onChange={this.onValueChange} />
      </form>
    )
  }
}
