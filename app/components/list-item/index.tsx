import { useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import CustomCheckbox from '~/shared/ui/custom-checkbox';
import { useDeleteTodo, useToggleTodo } from '~/shared/api/todos/hooks';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { Button, Dropdown } from 'antd';
import type { Todo } from '~/shared/types/todo';
import { ItemWrapper, DropdownListItem } from './styles';

interface ListItemProps {
  todo: Todo;
  handleOpenDrawer: (param: Todo) => void;
  setOpenErrorDrawer: () => void;
}

const ListItem: React.FC<ListItemProps> = ({
  todo,
  handleOpenDrawer,
  setOpenErrorDrawer,
}) => {
  const {
    mutate: deleteTodo,
    isPending: deleteTodoLoading,
    isError: deleteTodosError,
  } = useDeleteTodo();

  const {
    mutate: toggleTodo,
    isPending: toggleTodoLoading,
    isError: toggleTodosError,
  } = useToggleTodo();

  const handleDeleteTodo = (id: number): void => {
    deleteTodo(id);
  };

  useEffect(() => {
    if (deleteTodosError || toggleTodosError) {
      setOpenErrorDrawer();
    }
  }, [deleteTodosError, toggleTodosError]);

  const items = [
    {
      key: '1',
      label: (
        <DropdownListItem onClick={() => handleOpenDrawer({ ...todo })}>
          <FaEdit
            style={{ flexShrink: 0, color: '#8c8c8c' }}
            size={16}
            role="button"
          />
          редактировать
        </DropdownListItem>
      ),
    },
    {
      key: '2',
      label: (
        <DropdownListItem onClick={() => handleDeleteTodo(todo.id)}>
          <FaTrash
            style={{ flexShrink: 0, color: '#8c8c8c' }}
            size={16}
            role="button"
          />
          удалить
        </DropdownListItem>
      ),
    },
  ];

  return (
    <ItemWrapper
      key={todo.id}
      isCompleted={todo.completed}
      isPiority={todo.isPriority}
      isLoading={deleteTodoLoading || toggleTodoLoading}
    >
      <CustomCheckbox
        todo={todo}
        toggleTodo={toggleTodo}
        disabled={toggleTodosError}
      />
      <Dropdown
        menu={{
          items,
        }}
        placement="bottomLeft"
      >
        <Button type="text" shape="circle">
          <BsThreeDotsVertical size={20} color="8c8c8c" />
        </Button>
      </Dropdown>
    </ItemWrapper>
  );
};

export default ListItem;
