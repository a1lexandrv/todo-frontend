import axios from 'axios';
import type { Todo } from '~/shared/types/todo';

export const getTodos = async (): Promise<Todo[]> => {
  const { data } = await axios.get<Todo[]>('http://localhost:3000/todos');
  return data;
};

export const addTodo = async (title: string): Promise<Todo> => {
  const { data } = await axios.post<Todo>('http://localhost:3000/todos', {
    title,
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

export interface EditTodoParams {
  id: number;
  title: string;
}

export const editTodo = async ({
  id,
  title,
}: EditTodoParams): Promise<Todo> => {
  const { data } = await axios.patch<Todo>(
    `http://localhost:3000/todos/${id}/edit`,
    {
      title,
    },
  );
  return data;
};
