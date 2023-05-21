import { formatDistanceToNow } from 'date-fns';

import Timer from '../timer';
import './task-item.css';
import { ITask } from '../../interfaces/interfaces';

interface ITaskItemProps {
  value: ITask;
  onDeleted: (id: number) => void;
  onEdit: () => void;
  onCompleted: (id: number) => void;
  startTimer: (id: number, time: number) => void;
}

function TaskItem({
  value: { id, completed, text, date, timer },
  onDeleted,
  onEdit,
  onCompleted,
  startTimer,
}: ITaskItemProps) {
  const currentData = new Date();
  const dataOfCreation = date;

  return (
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        id={id.toString()}
        checked={completed}
        readOnly
        onClick={() => onCompleted(id)}
      />
      <label htmlFor={id.toString()}>
        <span className="title">{text}</span>
      </label>

      <Timer startTimer={(Id: number, time: number) => startTimer(Id, time)} timer={timer} id={id} />
      <span className="created"> {`created ${formatDistanceToNow(dataOfCreation, { includeSeconds: true })} ago`}</span>
      <span className="task-btns">
        <button type="button" aria-label="Edit" className="icon icon-edit" onClick={() => onEdit()} />
        <button type="button" aria-label="Edit" className="icon icon-destroy" onClick={() => onDeleted(id)} />
      </span>
    </div>
  );
}

export default TaskItem;
