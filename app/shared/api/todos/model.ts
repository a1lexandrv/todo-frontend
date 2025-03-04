import axios from 'axios';
import type { CreatingTodo, EditingTodo, Todo } from '~/shared/types/todo';

export const getTodos = async (): Promise<Todo[]> => {
  const { data } = await axios.get<Todo[]>('http://localhost:3000/todos');
  return data;
};

export const addTodo = async ({
  title,
  date,
  isPriority,
}: CreatingTodo): Promise<Todo> => {
  const { data } = await axios.post<Todo>('http://localhost:3000/todos', {
    title,
    date,
    isPriority,
  });
  return data;
};

export const deleteTodo = async (id: number) => {
  const { data } = await axios.delete(`http://localhost:3000/todos/${id}`);
  return data;
};

export const toggleTodo = async (id: number) => {
  const { data } = await axios.patch(
    `http://localhost:3000/todos/${id}/toggle`,
  );
  return data;
};

export const editTodo = async ({
  id,
  title,
  date,
  isPriority,
}: EditingTodo): Promise<Todo> => {
  const { data } = await axios.patch<Todo>(
    `http://localhost:3000/todos/${id}/edit`,
    {
      title,
      date,
      isPriority,
    },
  );
  return data;
};
