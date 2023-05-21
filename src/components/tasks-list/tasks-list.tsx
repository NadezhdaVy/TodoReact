import classNames from 'classnames';

import TaskItem from '../task-item';
import EditTask from '../edit-task';
import './tasks-list.css';
import { ITask } from '../../interfaces/interfaces';

interface ITaskListProps {
  onDeleted: (id: number) => void;
  onCompleted: (id: number) => void;
  todos: ITask[];
  onEdit: (id: number) => void;
  onItemEditing: (text: string, id: number) => void;
  startTimer: (id: number, time: number) => void;
}

function TasksList({ onDeleted, onCompleted, todos = [], onEdit, onItemEditing, startTimer }: ITaskListProps) {
  if (todos.length === 0) {
    return <ul />;
  }
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

          <EditTask task={item} onItemEditing={(text, id) => onItemEditing(text, id)} />
        </li>
      ))}
    </ul>
  );
}

export default TasksList;
