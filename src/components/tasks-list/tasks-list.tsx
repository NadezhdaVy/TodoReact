import classNames from 'classnames';

import TaskItem from '../task-item';
import EditTask from '../edit-task';
import './tasks-list.css';
import { useTasks, useFilter } from '../../context/tasks-context';
import { currentFilter } from '../../utils/utils';

function TasksList() {
  const { tasks } = useTasks();
  const { filters: filter } = useFilter();

  const filteredTasks = currentFilter(tasks, filter);

  if (tasks.length === 0) {
    return <ul />;
  }
  return (
    <ul className="todo-list">
      {filteredTasks.map((item) => (
        <li key={item.id} className={classNames({ completed: item.completed }, { editing: item.editing })}>
          <TaskItem value={item} />

          <EditTask task={item} />
        </li>
      ))}
    </ul>
  );
}

export default TasksList;
