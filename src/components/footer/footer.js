import React from 'react';
import PropTypes from 'prop-types';

import TasksFilter from '../tasks-filter';
import './footer.css';

export default class Footer extends React.Component {
  static defaultProps = {
    onClearAllCompleted: () => {},
    onFilterChange: () => {},
    itemsLeft: () => {},
  };

  static propTypes = {
    onClearAllCompleted: PropTypes.func,
    onFilterChange: PropTypes.func,
    itemsLeft: PropTypes.func,
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  render() {
    const { itemsLeft } = this.props;

    let className = 'footer';

    if (this.props.items.length === 0) {
      className += ' hidden';
    }

    return (
      <footer className={className}>
        <span className="todo-count">
          {itemsLeft()} {itemsLeft() === 1 ? 'item' : 'items'} left
        </span>
        <TasksFilter onFilterChange={(filter) => this.props.onFilterChange(filter)} filter={this.props.filter} />
        <button type="button" className="clear-completed" onClick={() => this.props.onClearAllCompleted()}>
          Clear completed
        </button>
      </footer>
    );
  }
}
