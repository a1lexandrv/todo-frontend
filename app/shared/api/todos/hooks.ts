import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import type { Todo } from '~/shared/types/todo';
import {
  addTodo,
  deleteTodo,
  editTodo,
  getTodos,
  toggleTodo,
  type EditTodoParams,
} from './model';

export const useGetTodos = () => {
  return useQuery<Todo[], AxiosError>({
    queryKey: ['todos'],
    queryFn: getTodos,
  });
};

export const useAddTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<Todo, AxiosError, string>({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, number>({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useToggleTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<Todo, AxiosError, number>({
    mutationFn: toggleTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};

export const useEditTodo = (onSuccess: () => void) => {
  const queryClient = useQueryClient();

  return useMutation<Todo, AxiosError, EditTodoParams>({
    mutationFn: editTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      onSuccess?.();
    },
  });
};
