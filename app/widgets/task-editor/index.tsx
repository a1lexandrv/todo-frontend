import { useEffect, useState, type SetStateAction } from 'react';
import { Button, Input } from 'antd';
import Drawer from '~/shared/ui/drawer';
import { useEditTodo } from '~/shared/api/todos/hooks';
import type { Todo } from '~/shared/types/todo';
import { InputWrapper, Title } from './styles';

interface TaskEditorProps {
  isOpenDrawer: boolean;
  editingTodo: Todo | null;
  setOpenDrawer: React.Dispatch<SetStateAction<boolean>>;
}

const TaskEditor: React.FC<TaskEditorProps> = ({
  isOpenDrawer,
  setOpenDrawer,
  editingTodo,
}) => {
  const [value, setValue] = useState('');
  const [isValid, setValid] = useState(false);

  const {
    mutate: editTodo,
    isPending: editTodoLoading,
    isError: editTodosError,
  } = useEditTodo(() => handleCloseDrawer());

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
  };

  const handleEditTodo = (): void => {
    if (!value.trim() || !editingTodo) return;
    editTodo({ id: editingTodo.id, title: value });
  };

  useEffect(() => {
    if (editingTodo) {
      setValue(editingTodo.title);
    }
  }, [editingTodo]);

  useEffect(() => {
    if (!value.length || value.length > 99) {
      setValid(false);
    } else setValid(true);
  }, [value]);

  return (
    <Drawer
      height="fit-content"
      open={isOpenDrawer}
      onClose={handleCloseDrawer}
    >
      <InputWrapper>
        <Title>Редактирование</Title>
        <Input
          style={{
            backgroundColor: '#ffffff',
            padding: '12px',
            borderRadius: '16px',
          }}
          type="text"
          size="large"
          value={value}
          status={!isValid ? 'error' : ''}
          maxLength={100}
          placeholder="Что вы хотите сделать"
          onPressEnter={handleEditTodo}
          onChange={(e) => setValue(e.target.value.trimStart())}
        />
        <Button
          style={{
            backgroundColor: '#4096ff',
            padding: '24px',
            borderRadius: '16px',
          }}
          onClick={handleEditTodo}
          loading={editTodoLoading}
          disabled={!isValid}
          size="large"
          type="primary"
        >
          <p style={{ fontSize: '16px' }}>Сохранить</p>
        </Button>
      </InputWrapper>
    </Drawer>
  );
};

export default TaskEditor;
