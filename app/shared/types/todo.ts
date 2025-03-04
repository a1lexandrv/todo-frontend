export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  date?: string;
  isPriority?: boolean;
  creationDate: Date;
}

interface Date {
  year: number;
  month: number;
  day: number;
  time: number;
}

export type CreatingTodo = Pick<Todo, 'title' | 'date' | 'isPriority'>;

export type EditingTodo = Pick<Todo, 'id' | 'title' | 'date' | 'isPriority'>;
