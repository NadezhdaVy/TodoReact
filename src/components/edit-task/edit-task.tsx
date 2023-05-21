import { ChangeEvent, useState, FormEvent } from 'react';

interface IEditTaskProps {
  task: { text: string; id: number };
  onItemEditing: (value: string, id: number) => void;
}

function EditTask({ task: { text = '', id = 0 }, onItemEditing }: IEditTaskProps) {
  const [value, setValue] = useState(text);

  const onValueChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onItemEditing(value, id);
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" className="edit" value={value} onChange={onValueChange} />
    </form>
  );
}

export default EditTask;
