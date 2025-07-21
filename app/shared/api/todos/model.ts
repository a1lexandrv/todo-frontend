import API from '../config';
import type { CreatingTodo, EditingTodo, Todo } from '~/shared/types/todo';

export const getTodos = async (): Promise<Todo[]> => {
  const { data } = await API.get<Todo[]>('todos');
  return data;
};

export const addTodo = async ({
  title,
  date,
  isPriority,
}: CreatingTodo): Promise<Todo> => {
  const { data } = await API.post<Todo>('todos', {
    title,
    date,
    isPriority,
  });
  return data;
};

export const deleteTodo = async (id: number) => {
  const { data } = await API.delete(`todos/${id}`);
  return data;
};

export const toggleTodo = async (id: number) => {
  const { data } = await API.patch(`todos/${id}/toggle`);
  return data;
};

export const editTodo = async ({
  id,
  title,
  date,
  isPriority,
}: EditingTodo): Promise<Todo> => {
  const { data } = await API.patch<Todo>(`todos/${id}/edit`, {
    title,
    date,
    isPriority,
  });
  return data;
};
