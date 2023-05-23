import './tasks-filter.css';

import { memo } from 'react';

import { TFilter } from '../../interfaces/interfaces';
import { useFilter } from '../../context/tasks-context';

function TasksFilter() {
  const { filters: filter, changeFilter } = useFilter();
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
        <button onClick={() => changeFilter(name as TFilter)} type="button" className={className}>
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{buttons}</ul>;
}

export default memo(TasksFilter);
