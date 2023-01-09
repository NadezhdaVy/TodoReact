import React from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import './task-item.css'

export default class TaskItem extends React.Component {
  static defaultProps = {
    onEdit: () => {},
    onDeleted: () => {},
    onCompleted: () => {},
  }

  static propTypes = {
    onEdit: PropTypes.func,
    onDeleted: PropTypes.func,
    value: PropTypes.object.isRequired,
    onCompleted: PropTypes.func,
  }

  render() {
    const { value, onDeleted, onCompleted, onEdit } = this.props

    const currentData = new Date()
    const dataOfCreation = this.props.value.date

    return (
      <div className="view">
        <input className="toggle" type="checkbox" id={value.id} onClick={() => onCompleted()} />
        <label htmlFor={value.id}>
          <span className="description"> {value.text}</span>
          <span className="created">
            created{' '}
            {formatDistanceToNow(dataOfCreation, currentData, {
              includeSeconds: true,
            })}{' '}
            ago
          </span>
        </label>
        <button type="button" aria-label="Edit" className="icon icon-edit" onClick={() => onEdit()} />
        <button type="button" aria-label="Edit" className="icon icon-destroy" onClick={() => onDeleted()} />
      </div>
    )
  }
}
