/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-empty-function */
import { ReactElement, createContext, useCallback, useContext, useReducer } from 'react';

import { updateProperty, createNewTask } from '../utils/utils';
import { ITask, TFilter } from '../interfaces/interfaces';

type TInitialState = {
  tasks: ITask[];
  filters: TFilter;
};

export const initialState: TInitialState = {
  tasks: [],
  filters: 'all',
};

const enum REDUCER_ACTION_TYPE {
  ADD,
  DELETE,
  SET_TO_EDIT,
  UPDATE,
  UPDATE_TIMER,
  CLEAR_COMPLETED,
  COMPLETE,
  FILTER,
}

type TReducerAction = {
  type: REDUCER_ACTION_TYPE;
  payload: Partial<ITask> & { time?: number; filters?: TFilter };
};

const reducer = (state: TInitialState, action: TReducerAction): TInitialState => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.ADD:
      return { ...state, tasks: [...state.tasks, createNewTask(action.payload.text ?? '', action.payload.time)] };
    case REDUCER_ACTION_TYPE.DELETE:
      return { ...state, tasks: state.tasks.slice().filter((task) => Number(task.id) !== action.payload.id) };
    case REDUCER_ACTION_TYPE.UPDATE:
      return { ...state, tasks: updateProperty(state.tasks, action.payload.id ?? 0, 'editing', action.payload.text) };
    case REDUCER_ACTION_TYPE.CLEAR_COMPLETED:
      return { ...state, tasks: state.tasks.slice().filter((task) => !task.completed) };
    case REDUCER_ACTION_TYPE.SET_TO_EDIT:
      return { ...state, tasks: updateProperty(state.tasks, action.payload.id ?? 0, 'editing') };
    case REDUCER_ACTION_TYPE.UPDATE_TIMER:
      return {
        ...state,
        tasks: updateProperty(state.tasks, action.payload.id ?? 0, 'timer', action.payload.time ?? 0),
      };
    case REDUCER_ACTION_TYPE.COMPLETE:
      return { ...state, tasks: updateProperty(state.tasks, action.payload.id ?? 0, 'completed') };

    // filters

    case REDUCER_ACTION_TYPE.FILTER:
      return { ...state, filters: action.payload.filters ?? 'all' };

    default:
      throw new Error('the action is invalid');
  }
};

const useTasksContext = (initialState: TInitialState) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addItem = useCallback((value: [string, number]) => {
    const text = value[0];
    const time = value[1];
    dispatch({ type: REDUCER_ACTION_TYPE.ADD, payload: { text, time } });
  }, []);

  const deleteTask = useCallback((id: number) => dispatch({ type: REDUCER_ACTION_TYPE.DELETE, payload: { id } }), []);

  const editTask = useCallback(
    (id: number) => dispatch({ type: REDUCER_ACTION_TYPE.SET_TO_EDIT, payload: { id } }),
    []
  );

  const clearAllCompleted = useCallback(() => dispatch({ type: REDUCER_ACTION_TYPE.CLEAR_COMPLETED, payload: {} }), []);

  const completeTask = useCallback(
    (id: number) => dispatch({ type: REDUCER_ACTION_TYPE.COMPLETE, payload: { id } }),
    []
  );

  const updateItem = useCallback(
    (text: string, id: number) => dispatch({ type: REDUCER_ACTION_TYPE.UPDATE, payload: { text, id } }),
    []
  );

  const updateTimer = useCallback(
    (id: number, time: number) => dispatch({ type: REDUCER_ACTION_TYPE.UPDATE_TIMER, payload: { id, time } }),
    []
  );

  const changeFilter = (filter: TFilter) =>
    dispatch({ type: REDUCER_ACTION_TYPE.FILTER, payload: { filters: filter } });

  return {
    state,
    addItem,
    deleteTask,
    editTask,
    clearAllCompleted,
    completeTask,
    updateItem,
    updateTimer,
    changeFilter,
  };
};

type TUseTasksContext = ReturnType<typeof useTasksContext>;

const initialContextState: TUseTasksContext = {
  state: initialState,
  addItem: (value: [string, number]) => {},
  deleteTask: (id: number) => {},
  editTask: (id: number) => {},
  clearAllCompleted: () => {},
  completeTask: (id: number) => {},
  updateItem: (text: string, id: number) => {},
  updateTimer: (id: number, time: number) => {},
  changeFilter: (filter: TFilter) => {},
};

export const TasksContext = createContext<TUseTasksContext>(initialContextState);

type TChildren = {
  children?: ReactElement;
};

export const TasksProvider = ({ children, ...tasks }: TChildren & TInitialState): ReactElement => {
  return <TasksContext.Provider value={useTasksContext(tasks)}>{children}</TasksContext.Provider>;
};

type TasksHookType = Omit<TUseTasksContext, 'changeFilter' | 'state'>;
type UseTasksHookType = TasksHookType & { tasks: ITask[] };

export const useTasks = (): UseTasksHookType => {
  const {
    state: { tasks },
    addItem,
    deleteTask,
    editTask,
    clearAllCompleted,
    completeTask,
    updateItem,
    updateTimer,
  } = useContext(TasksContext);
  return { tasks, addItem, deleteTask, editTask, clearAllCompleted, completeTask, updateItem, updateTimer };
};

type FilterHookType = Pick<TUseTasksContext, 'changeFilter'>;
type UseFilterHookType = FilterHookType & { filters: TFilter };

export const useFilter = (): UseFilterHookType => {
  const {
    state: { filters },
    changeFilter,
  } = useContext(TasksContext);
  return { filters, changeFilter };
};
