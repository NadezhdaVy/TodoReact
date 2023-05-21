export interface ITask {
  text: string;
  completed: boolean;
  editing: boolean;
  id: number;
  date: Date;
  timer: number;
}

export type TFilter = 'all' | 'completed' | 'active';
