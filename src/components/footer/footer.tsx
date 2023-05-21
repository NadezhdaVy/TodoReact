import TasksFilter from '../tasks-filter';
import './footer.css';
import { ITask, TFilter } from '../../interfaces/interfaces';

interface IFooterProps {
  itemsLeft: () => number;
  items: ITask[];
  onFilterChange: (filter: TFilter) => void;
  onClearAllCompleted: () => void;
  filter: TFilter;
}

function Footer({ itemsLeft, items, onFilterChange, onClearAllCompleted, filter }: IFooterProps) {
  let className = 'footer';

  if (items.length === 0) {
    className += ' hidden';
  }

  return (
    <footer className={className}>
      <span className="todo-count">
        {itemsLeft()} {itemsLeft() === 1 ? 'item' : 'items'} left
      </span>
      <TasksFilter onFilterChange={(value: TFilter) => onFilterChange(value)} filter={filter} />
      <button type="button" className="clear-completed" onClick={() => onClearAllCompleted()}>
        Clear completed
      </button>
    </footer>
  );
}

export default Footer;
