import React from 'react'
import PropTypes from 'prop-types'

import './tasks-filter.css'

export default class TasksFilter extends React.Component {
  static defaultProps = {
    filter: 'all',
    onFilterChange: () => {},
  }

  static propTypes = {
    onFilterChange: PropTypes.func,
    filter: PropTypes.string,
  }

  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'completed', label: 'Completed' },
  ]

  render() {
    const { filter, onFilterChange } = this.props

    const buttons = this.buttons.map(({ name, label }) => {
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
}
