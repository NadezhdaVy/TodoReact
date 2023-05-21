import { useCallback, useState } from 'react';

import TasksList from '../tasks-list';
import NewTaskForm from '../new-task-form';
import Footer from '../footer';
import './app.css';
import { ITask, TFilter } from '../../interfaces/interfaces';

const initialState: ITask[] = [];

function App() {
  let maxId = Date.now() * 2;

  const [filters, setFilters] = useState<TFilter>('all');
  const [tasks, setTasks] = useState<ITask[]>(initialState);

  const createNewTask = (value: string, timer = 0) => ({
    text: value,
    completed: false,
    editing: false,
    id: (maxId += 1),
    date: new Date(),
    timer,
  });

  const addItem = (text: [string, number]) => {
    const textValue = text[0];
    const timeValue = text[1];
    const newItem = createNewTask(textValue, timeValue);

    setTasks((items) => [...items, newItem]);
  };

  const currentFilter = (items: ITask[], filter: TFilter) => {
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

  function deleteTask(id: number) {
    setTasks((items) => {
      const index = items.findIndex((el) => el.id === id);
      return [...items.slice(0, index), ...items.slice(index + 1)];
    });
  }

  const toggleProperty = (arr: ITask[], id: number, propName: keyof ITask, val?: string) => {
    const idx = arr.findIndex((el) => el.id === id);
    let value = val;
    if (value === undefined) {
      value = arr[idx].text;
    }
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName], text: value };

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  const editTask = (id: number) => {
    setTasks((items) => toggleProperty(items, id, 'editing'));
  };

  const clearAllCompleted = () => {
    setTasks((items) => items.filter((el) => !el.completed));
  };

  const leftTasks = () => {
    return tasks.filter((el) => !el.completed).length;
  };

  const completeTask = (id: number) => {
    setTasks((items) => toggleProperty(items, id, 'completed'));
  };

  const updateItem = (text: string, id: number) => {
    setTasks((items) => toggleProperty(items, id, 'editing', text));
  };

  const updateTimer = useCallback((id: number, time: number) => {
    setTasks((items) => {
      const checkExisting = items.find((el) => el.id === id);

      if (!checkExisting) {
        return items;
      }
      const idx = items.findIndex((el) => el.id === id);

      const oldItem = items[idx];

      const newItem = { ...oldItem, timer: time };

      const newArr = [...items.slice(0, idx), newItem, ...items.slice(idx + 1)];
      return newArr;
    });
  }, []);

  const changeFilter = (filter: TFilter) => {
    setFilters(filter);
  };

  const showTasks = currentFilter(tasks, filters);
  return (
    <div className="todoapp">
      <header className="header">
        <h1>Todo</h1>
        <NewTaskForm onItemAdded={(text: [string, number]) => addItem(text)} />
      </header>
      <main className="main">
        <TasksList
          onEdit={(id: number) => editTask(id)}
          onDeleted={(id: number) => deleteTask(id)}
          todos={showTasks}
          onCompleted={(id: number) => completeTask(id)}
          onItemEditing={(text: string, id: number) => updateItem(text, id)}
          startTimer={(id: number, time: number) => updateTimer(id, time)}
        />
        <Footer
          onClearAllCompleted={() => clearAllCompleted()}
          onFilterChange={(filter: TFilter) => changeFilter(filter)}
          filter={filters}
          itemsLeft={() => leftTasks()}
          items={tasks}
        />
      </main>
    </div>
  );
}

export default App;
