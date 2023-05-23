import { formatDistanceToNow } from 'date-fns';

import Timer from '../timer';
import './task-item.css';
import { ITask } from '../../interfaces/interfaces';
import { useTasks } from '../../context/tasks-context';

interface ITaskItemProps {
  value: ITask;
}

function TaskItem({ value: { id, completed, text, date, timer } }: ITaskItemProps) {
  const { completeTask, deleteTask, editTask } = useTasks();

  const dataOfCreation = date;

  return (
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        id={id.toString()}
        checked={completed}
        readOnly
        onClick={() => completeTask(id)}
      />
      <label htmlFor={id.toString()}>
        <span className="title">{text}</span>
      </label>

      <Timer timer={timer} id={id} />
      <span className="created"> {`created ${formatDistanceToNow(dataOfCreation, { includeSeconds: true })} ago`}</span>
      <span className="task-btns">
        <button type="button" aria-label="Edit" className="icon icon-edit" onClick={() => editTask(id)} />
        <button type="button" aria-label="Edit" className="icon icon-destroy" onClick={() => deleteTask(id)} />
      </span>
    </div>
  );
}

export default TaskItem;
