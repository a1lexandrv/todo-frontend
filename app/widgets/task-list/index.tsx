import { useRef, useState } from 'react';
import { AiFillSignature } from 'react-icons/ai';
import ListItem from '../../components/list-item';
import { useGetTodos } from '~/shared/api/todos/hooks';
import { usePullToBounce } from '~/shared/utils/usePullToBounce';
import { BsFillXCircleFill } from 'react-icons/bs';
import type { Todo } from '~/shared/types/todo';
import TaskEditor from '~/widgets/task-editor';
import TaskDrawerError from '~/widgets/drawer-error';
import TaskCreator from '~/widgets/task-creator';
import { List, ListWrapper, EmptyState } from './styles';

export const TaskList = () => {
  const [isOpenEditorDrawer, setOpenEditorDrawer] = useState(false);
  const [isDrawerErrorOpen, setIsDrawerErrorOpen] = useState(false);
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
    setOpenEditorDrawer(true);
  };

  const handleOpenErrorDrawer = () => {
    setIsDrawerErrorOpen(true);
  };

  const handleCloseErrorDrawer = () => {
    setIsDrawerErrorOpen(false);
  };

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
        {todos?.length === 0 && !isLoading ? (
          <EmptyState>
            <AiFillSignature size={32} />
            <p>Список задач пуст</p>
          </EmptyState>
        ) : (
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
                setOpenErrorDrawer={handleOpenErrorDrawer}
              />
            ))}
          </List>
        )}
      </ListWrapper>
      <TaskCreator setOpenErrorDrawer={handleOpenErrorDrawer} />
      <TaskEditor
        isOpenDrawer={isOpenEditorDrawer}
        setOpenDrawer={setOpenEditorDrawer}
        setOpenErrorDrawer={handleOpenErrorDrawer}
        editingTodo={editingTodo}
      />
      <TaskDrawerError
        open={isDrawerErrorOpen}
        onClose={handleCloseErrorDrawer}
      />
    </>
  );
};

export default TaskList;
