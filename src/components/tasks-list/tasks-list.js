import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import TaskItem from '../task-item'
import EditTask from '../edit-task'

import './tasks-list.css'

export default class TasksList extends React.Component {
  static defaultProps = {
    onEdit: () => {},
    onItemEditing: () => {},
    onDeleted: () => {},
    onCompleted: () => {},
    startTimer: () => {},
  }

  static propTypes = {
    onEdit: PropTypes.func,
    onItemEditing: PropTypes.func,
    onDeleted: PropTypes.func,
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    onCompleted: PropTypes.func,
    startTimer: PropTypes.func,
  }

  render() {
    const { onDeleted, onCompleted, todos, onEdit, onItemEditing, startTimer } = this.props

    return (
      <ul className="todo-list">
        {todos.map((item) => (
          <li key={item.id} className={classNames({ completed: item.completed }, { editing: item.editing })}>
            <TaskItem
              startTimer={(id, time) => startTimer(id, time)}
              value={item}
              onEdit={() => onEdit(item.id)}
              onDeleted={(id) => onDeleted(id)}
              onCompleted={(id) => onCompleted(id)}
            />

            <EditTask task={item} onItemEditing={(text, id) => onItemEditing(text, id)} bool={item.completed} />
          </li>
        ))}
      </ul>
    )
  }
}
