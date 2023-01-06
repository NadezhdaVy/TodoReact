import React from 'react';

import TasksList from '../tasks-list';
import NewTask from '../new-task-form';
import Footer from '../footer';

import './app.css';

export default class App extends React.Component {
  maxId = 100;

  state = {
    items: [
      this.createNewTask('Completed task'),
      this.createNewTask('Editing task'),
      this.createNewTask('Active task'),
    ],
    filter: 'all',
  };

  addItem = (text) => {
    const newItem = this.createNewTask(text);

    this.setState(({ items }) => {
      const newArr = [...items, newItem];
      return {
        items: newArr,
      };
    });
  };

  currentFilter = (items, filter) => {
    switch (filter) {
      case 'all':
        return items;
      case 'active':
        return items.filter((item) => !item.completed);
      case 'completed':
        return items.filter((item) => item.completed);
      default:
        return items;
    }
  };

  deleteTask = (id) => {
    this.setState(({ items }) => {
      const index = items.findIndex((el) => el.id === id);
      const newArr = [...items.slice(0, index), ...items.slice(index + 1)];
      return {
        items: newArr,
      };
    });
  };

  editTask = (id) => {
    this.setState(({ items }) => ({
      items: this.toggleProperty(items, id, 'editing'),
    }));
  };

  clearAllCompleted = () => {
    this.setState(({ items }) => {
      const newArr = items.filter((el) => !el.completed);
      return {
        items: newArr,
      };
    });
  };

  leftTasks = () => {
    const countActiveTasks = this.state.items.filter((el) => !el.completed).length;
    return countActiveTasks;
  };

  completeTask = (id) => {
    this.setState(({ items }) => ({
      items: this.toggleProperty(items, id, 'completed'),
    }));
  };

  updateItem = (text, id) => {
    this.setState(({ items }) => ({
      items: this.toggleProperty(items, id, 'editing', text),
    }));
  };

  changeFilter(filter) {
    this.setState({ filter });
  }

  createNewTask(value) {
    return {
      text: value,
      completed: false,
      editing: false,
      id: this.maxId++,
      date: new Date(),
    };
  }

  toggleProperty(arr, id, propName, val) {
    const idx = arr.findIndex((el) => el.id === id);
    if (val === undefined) {
      val = arr[idx].text;
    }
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName], text: val };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  }

  render() {
    const showTasks = this.currentFilter(this.state.items, this.state.filter);
    return (
      <div className="todoapp">
        <header className="header">
          <h1>Todo</h1>
          <NewTask onItemAdded={(text) => this.addItem(text)} />
        </header>
        <main className="main">
          <TasksList
            onEdit={(id) => this.editTask(id)}
            onDeleted={(id) => this.deleteTask(id)}
            todos={showTasks}
            onCompleted={(id) => this.completeTask(id)}
            onItemEditing={(text, id) => this.updateItem(text, id)}
          />
          <Footer
            onClearAllCompleted={() => this.clearAllCompleted()}
            onFilterChange={(filter) => this.changeFilter(filter)}
            filter={this.state.filter}
            itemsLeft={() => this.leftTasks()}
            items={this.state.items}
          />
        </main>
      </div>
    );
  }
}
