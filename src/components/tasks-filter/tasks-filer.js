import React from 'react'
import PropTypes from 'prop-types'

import './tasks-filter.css'

function TasksFilter({ filter, onFilterChange }) {
  const allButtons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]

  const buttons = allButtons.map(({ name, label }) => {
    const selected = filter === name
    const className = selected ? 'selected' : ''
    return (
      <li key={name}>
        <button onClick={() => onFilterChange(name)} type="button" className={className}>
          {label}
        </button>
      </li>
    )
  })

  return <ul className="filters">{buttons}</ul>
}

TasksFilter.defaultProps = {
  filter: 'all',
  onFilterChange: () => {},
}

TasksFilter.propTypes = {
  onFilterChange: PropTypes.func,
  filter: PropTypes.string,
}

export default TasksFilter
