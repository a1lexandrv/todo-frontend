import { useEffect, useState } from 'react';
import { Input, DatePicker, Switch } from 'antd';
import dayjs from 'dayjs';
import Drawer from '~/shared/ui/drawer';
import { GoPlus } from 'react-icons/go';
import { useAddTodo } from '~/shared/api/todos/hooks';
import Button from '~/shared/ui/button';
import FloatButton from '~/shared/ui/float-button';
import type { CreatingTodo } from '~/shared/types/todo';
import { DateWrapper, DateWrapperItem, InputWrapper, Title } from './styles';

interface TaskCreatorProps {
  setOpenErrorDrawer: () => void;
}

const defaultTodoValue = {
  title: '',
};

const TaskCreator: React.FC<TaskCreatorProps> = ({ setOpenErrorDrawer }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [newTodo, setNewTodo] = useState<CreatingTodo>(defaultTodoValue);
  const [value, setValue] = useState('');
  const [isValid, setValid] = useState(false);

  const dateFormat = 'DD-MM-YYYY';
  const today = dayjs().startOf('day');

  const {
    mutate: addTodo,
    isPending: addTodoLoading,
    isError: addTodosError,
  } = useAddTodo(() => handleCloseDrawer());

  const handleAddTodo = (): void => {
    if (!value.length) return;

    const updatedTodo = { ...newTodo, title: value };

    addTodo(updatedTodo);
    setNewTodo(defaultTodoValue);
  };

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setValue('');
    setNewTodo({ title: '', date: undefined, isPriority: undefined });
    setIsDrawerOpen(false);
  };

  const onDateChange = (date: string | null) => {
    setNewTodo((prev) => ({ ...prev, date: date || undefined }));
  };

  const onSwitchChange = (checked: boolean) => {
    setNewTodo((prev) => ({ ...prev, isPriority: checked }));
  };

  useEffect(() => {
    if (addTodosError) {
      setOpenErrorDrawer();
    }
  }, [addTodosError]);

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
          <Title>Создание задачи</Title>
          <DateWrapperItem>
            <h3>Описание</h3>
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
          </DateWrapperItem>
          <DateWrapper>
            <DateWrapperItem>
              <h3>Дата</h3>
              <DatePicker
                style={{
                  backgroundColor: '#ffffff',
                  padding: '12px',
                  borderRadius: '16px',
                }}
                format={dateFormat}
                defaultPickerValue={dayjs(today)}
                value={newTodo.date ? dayjs(newTodo.date, dateFormat) : null}
                getPopupContainer={(t) => t.parentElement as HTMLElement}
                disabledDate={(current) => current && current.isBefore(today)}
                onChange={(date) => onDateChange(date?.format(dateFormat))}
                placeholder="Выберите дату"
              />
            </DateWrapperItem>
            <DateWrapperItem>
              <h3>Приоритетность</h3>
              <Switch
                checked={newTodo.isPriority || false}
                onChange={onSwitchChange}
              />
            </DateWrapperItem>
          </DateWrapper>
          <Button
            text="Создать"
            type="primary"
            size="large"
            backgroundColor="#4096ff"
            onClick={handleAddTodo}
            loading={addTodoLoading}
            disabled={!isValid}
          />
        </InputWrapper>
      </Drawer>
    </>
  );
};

export default TaskCreator;
