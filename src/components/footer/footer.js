import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../tasks-filter'
import './footer.css'

function Footer({ itemsLeft, items, onFilterChange, onClearAllCompleted, filter }) {
  let className = 'footer'

  if (items.length === 0) {
    className += ' hidden'
  }

  return (
    <footer className={className}>
      <span className="todo-count">
        {itemsLeft()} {itemsLeft() === 1 ? 'item' : 'items'} left
      </span>
      <TasksFilter onFilterChange={(value) => onFilterChange(value)} filter={filter} />
      <button type="button" className="clear-completed" onClick={() => onClearAllCompleted()}>
        Clear completed
      </button>
    </footer>
  )
}

Footer.defaultProps = {
  onClearAllCompleted: () => {},
  onFilterChange: () => {},
  itemsLeft: () => {},
}

Footer.propTypes = {
  onClearAllCompleted: PropTypes.func,
  onFilterChange: PropTypes.func,
  itemsLeft: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default Footer
