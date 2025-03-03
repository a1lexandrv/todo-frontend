export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  date: Date;
}

interface Date {
  year: number;
  month: number;
  day: number;
  time: number;
}
