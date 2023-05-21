import './tasks-filter.css';

import { TFilter } from '../../interfaces/interfaces';

interface ITasksFilterProps {
  filter: TFilter | '';
  onFilterChange: (filter: TFilter) => void;
}

function TasksFilter({ filter = 'all', onFilterChange }: ITasksFilterProps) {
  const allButtons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ];

  const buttons = allButtons.map(({ name, label }) => {
    const selected = filter === name;
    const className = selected ? 'selected' : '';
    return (
      <li key={name}>
        <button onClick={() => onFilterChange(name as TFilter)} type="button" className={className}>
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{buttons}</ul>;
}

export default TasksFilter;
