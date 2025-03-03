import { useRef, useState } from 'react';
import { AiFillSignature } from 'react-icons/ai';
import ListItem from '../list-item';
import { useGetTodos } from '~/shared/api/todos/hooks';
import { usePullToBounce } from '~/shared/utils/usePullToBounce';
import { BsFillXCircleFill } from 'react-icons/bs';
import type { Todo } from '~/shared/types/todo';
import TaskEditor from '~/widgets/task-editor';
import { List, ListWrapper, EmptyState } from './styles';

export const TaskList = () => {
  const [isOpenDrawer, setOpenDrawer] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const { data: todos, isLoading, isError } = useGetTodos();

  const listRef = useRef<HTMLDivElement>(null!);
  const {
    offset,
    transition,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = usePullToBounce(listRef, 30, 500);

  const handleOpenDrawer = (todo: Todo) => {
    setEditingTodo(todo);
    setOpenDrawer(true);
  };

  if (!todos?.length && !isLoading) {
    return (
      <EmptyState>
        <AiFillSignature size={32} />
        <p>Список задач пуст</p>
      </EmptyState>
    );
  }

  if (isError) {
    return (
      <EmptyState>
        <BsFillXCircleFill size={32} />
        <p>Ошибка при загрузке списка</p>
      </EmptyState>
    );
  }

  return (
    <>
      <ListWrapper ref={listRef}>
        <List
          style={{ transform: `translateY(${offset}px)`, transition }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {todos?.map((todo) => (
            <ListItem
              key={todo.id}
              todo={todo}
              handleOpenDrawer={handleOpenDrawer}
            />
          ))}
        </List>
      </ListWrapper>
      <TaskEditor
        isOpenDrawer={isOpenDrawer}
        setOpenDrawer={setOpenDrawer}
        editingTodo={editingTodo}
      />
    </>
  );
};

export default TaskList;
