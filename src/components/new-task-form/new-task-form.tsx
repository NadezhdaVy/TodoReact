import { ChangeEvent, FormEvent, useState } from 'react';

import './new-task-form.css';

interface INewTaskFormProps {
  onItemAdded: (arg: [string, number]) => void;
}

interface IState {
  newTodo: string;
  min: string;
  sec: string;
}

function NewTaskForm({ onItemAdded }: INewTaskFormProps) {
  const [newItem, setNewItem] = useState({ newTodo: '', min: '', sec: '' });

  const convertToSeconds = (state: IState): [string, number] => {
    const { newTodo, min, sec } = state;
    const seconds = Number(min) * 60 + Number(sec);
    return [newTodo, seconds];
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (newItem.newTodo.trim()) {
      onItemAdded(convertToSeconds(newItem));
    }
    setNewItem({
      newTodo: '',
      min: '',
      sec: '',
    });
  };

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setNewItem((item) => ({ ...item, [name]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="new-todo-form">
      <input
        name="newTodo"
        type="text"
        onChange={onValueChange}
        value={newItem.newTodo}
        className="new-todo"
        placeholder="What needs to be done?"
        id="new-todo"
      />

      <input
        type="number"
        min={0}
        max={60}
        value={newItem.min}
        className="new-todo-form__timer"
        placeholder="Min"
        onChange={onValueChange}
        name="min"
      />

      <input
        value={newItem.sec}
        type="number"
        min={0}
        max={60}
        className="new-todo-form__timer"
        placeholder="Sec"
        onChange={onValueChange}
        name="sec"
      />

      <button aria-label="submit" type="submit" />
    </form>
  );
}

export default NewTaskForm;
