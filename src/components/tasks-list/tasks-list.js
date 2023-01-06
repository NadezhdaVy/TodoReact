import React from 'react';
import PropTypes from 'prop-types';

import TaskItem from '../task-item';
import EditTask from '../edit-task';

import './tasks-list.css';

export default class TasksList extends React.Component {
  static defaultProps = {
    onEdit: () => {},
    onItemEditing: () => {},
    onDeleted: () => {},
    onCompleted: () => {},
  };

  static propTypes = {
    onEdit: PropTypes.func,
    onItemEditing: PropTypes.func,
    onDeleted: PropTypes.func,
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    onCompleted: PropTypes.func,
  };

  render() {
    const { onDeleted, onCompleted, todos, onEdit, onItemEditing } = this.props;

    return (
      <ul className="todo-list">
        {todos.map((item) => (
          <li className={item.completed ? 'completed' : item.editing ? 'editing' : ' '} key={item.id}>
            <TaskItem
              value={item}
              onEdit={() => onEdit(item.id)}
              onDeleted={() => onDeleted(item.id)}
              onCompleted={() => onCompleted(item.id)}
            />

            <EditTask task={item} onItemEditing={(text, id) => onItemEditing(text, id)} />
          </li>
        ))}
      </ul>
    );
  }
}
