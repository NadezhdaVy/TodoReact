import { ChangeEvent, useState, FormEvent } from 'react';

import { useTasks } from '../../context/tasks-context';

interface IEditTaskProps {
  task: { text: string; id: number };
}

function EditTask({ task: { text = '', id = 0 } }: IEditTaskProps) {
  const { updateItem } = useTasks();

  const [value, setValue] = useState(text);

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateItem(value, id);
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" className="edit" value={value} onChange={onValueChange} />
    </form>
  );
}

export default EditTask;
