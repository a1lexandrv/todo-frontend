import { useEffect, useState } from 'react';
import { Button, Input } from 'antd';
import Drawer from '~/shared/ui/drawer';
import { GoPlus } from 'react-icons/go';
import { useAddTodo } from '~/shared/api/todos/hooks';
import FloatButton from '~/shared/ui/float-button';
import { InputWrapper, Title } from './styles';

const TaskCreator = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [value, setValue] = useState<string>('');
  const [isValid, setValid] = useState(false);

  const {
    mutate: addTodo,
    isPending: addTodoLoading,
    isError: addTodosError,
  } = useAddTodo();

  const handleAddTodo = (): void => {
    if (value.length) {
      addTodo(value);
      setValue('');
    }
  };

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  useEffect(() => {
    if (value.length > 99) {
      setValid(false);
    } else setValid(true);
  }, [value]);

  return (
    <>
      <FloatButton onClick={handleOpenDrawer}>
        <GoPlus size={24} />
      </FloatButton>
      <Drawer
        height="fit-content"
        open={isDrawerOpen}
        onClose={handleCloseDrawer}
      >
        <InputWrapper>
          <Title>Опишите задачу</Title>
          <Input
            style={{
              backgroundColor: '#ffffff',
              padding: '12px',
              borderRadius: '16px',
            }}
            type="text"
            size="large"
            autoFocus
            value={value}
            status={!isValid ? 'error' : ''}
            maxLength={100}
            placeholder="Что вы хотите сделать"
            onPressEnter={handleAddTodo}
            onChange={(e) => setValue(e.target.value.trimStart())}
          />
          <Button
            style={{
              backgroundColor: '#4096ff',
              padding: '24px',
              borderRadius: '16px',
            }}
            onClick={handleAddTodo}
            loading={addTodoLoading}
            disabled={!isValid}
            size="large"
            type="primary"
          >
            <p style={{ fontSize: '16px' }}>Создать</p>
          </Button>
        </InputWrapper>
      </Drawer>
    </>
  );
};

export default TaskCreator;
