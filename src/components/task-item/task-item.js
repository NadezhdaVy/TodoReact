import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import Timer from '../timer'
import './task-item.css'

export default class TaskItem extends React.Component {
  static defaultProps = {
    onEdit: () => {},
    onDeleted: () => {},
    onCompleted: () => {},
    startTimer: () => {},
  }

  static propTypes = {
    onEdit: PropTypes.func,
    onDeleted: PropTypes.func,
    value: PropTypes.object.isRequired,
    onCompleted: PropTypes.func,
    startTimer: PropTypes.func,
  }

  render() {
    const {
      value: { id, completed, text, timer },
      onDeleted,
      onEdit,
      startTimer,
      onCompleted,
    } = this.props

    const currentData = new Date()
    const dataOfCreation = this.props.value.date

    return (
      <div className="view">
        <input
          className="toggle"
          type="checkbox"
          id={id}
          checked={completed}
          readOnly
          onClick={() => onCompleted(id)}
        />
        <label htmlFor={id}>
          <span className="title">{text}</span>
        </label>

        <Timer startTimer={(Id, time) => startTimer(Id, time)} timer={timer} id={id} />
        <span className="created">
          created{' '}
          {formatDistanceToNow(dataOfCreation, currentData, {
            includeSeconds: true,
          })}{' '}
          ago
        </span>
        <span className="task-btns">
          <button type="button" aria-label="Edit" className="icon icon-edit" onClick={() => onEdit()} />
          <button type="button" aria-label="Edit" className="icon icon-destroy" onClick={() => onDeleted(id)} />
        </span>
      </div>
    )
  }
}
