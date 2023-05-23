import { ITask, TFilter } from '../interfaces/interfaces';

export const updateProperty = (
  state: ITask[],
  id: number,
  propName: keyof ITask,
  newVal?: string | number
): ITask[] => {
  const item = state.find((el) => el.id === id);

  if (!item) {
    return state;
  }

  const index = state.findIndex((el) => el.id === id);
  const oldItem = state[index];
  let newItem;

  // set to editing and back
  if (propName === 'editing') {
    newItem = { ...oldItem, [propName]: !oldItem[propName], text: newVal?.toString() ?? state[index].text };
  } else newItem = { ...oldItem, [propName]: newVal ?? !oldItem[propName] };

  return [...state.slice(0, index), newItem, ...state.slice(index + 1)];
};

export const createNewTask = (value: string, timer = 0): ITask => ({
  text: value,
  completed: false,
  editing: false,
  id: Math.random() * 11 + timer + Date.now(),
  date: new Date(),
  timer,
});

export const currentFilter = (items: ITask[], filter: TFilter) => {
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
