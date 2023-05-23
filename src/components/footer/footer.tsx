import TasksFilter from '../tasks-filter';
import './footer.css';
import { useTasks } from '../../context/tasks-context';

function Footer() {
  const { tasks: items, clearAllCompleted } = useTasks();
  let className = 'footer';

  if (items.length === 0) {
    className += ' hidden';
  }

  return (
    <footer className={className}>
      <span className="todo-count">
        {items.length} {items.length === 1 ? 'item' : 'items'} left
      </span>
      <TasksFilter />
      <button type="button" className="clear-completed" onClick={() => clearAllCompleted()}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
