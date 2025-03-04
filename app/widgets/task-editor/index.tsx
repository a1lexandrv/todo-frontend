import { useEffect, useState, type SetStateAction } from 'react';
import { Button, Input, DatePicker, Switch } from 'antd';
import dayjs from 'dayjs';
import Drawer from '~/shared/ui/drawer';
import { useEditTodo } from '~/shared/api/todos/hooks';
import type { Todo } from '~/shared/types/todo';
import { DateWrapper, DateWrapperItem, InputWrapper, Title } from './styles';

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
  const [date, setDate] = useState<string | undefined>(undefined);
  const [isPriority, setIsPriority] = useState<boolean>(false);
  const [isValid, setValid] = useState(false);

  const dateFormat = 'DD-MM-YYYY';
  const today = dayjs().startOf('day');

  const { mutate: editTodo, isPending: editTodoLoading } = useEditTodo(() =>
    handleCloseDrawer(),
  );

  const handleCloseDrawer = () => {
    setValue('');
    setDate(undefined);
    setIsPriority(false);
    setOpenDrawer(false);
  };

  const handleEditTodo = (): void => {
    if (!value.trim() || !editingTodo) return;

    editTodo({
      id: editingTodo.id,
      title: value,
      date,
      isPriority,
    });
  };

  const onDateChange = (newDate: dayjs.Dayjs | null) => {
    setDate(newDate ? newDate.format(dateFormat) : undefined);
  };

  const onSwitchChange = (checked: boolean) => {
    setIsPriority(checked);
  };

  useEffect(() => {
    if (editingTodo) {
      setValue(editingTodo.title);
      setDate(editingTodo.date);
      setIsPriority(editingTodo.isPriority || false);
    }
  }, [editingTodo]);

  useEffect(() => {
    setValid(value.length > 0 && value.length <= 99);
  }, [value]);

  return (
    <Drawer
      height="fit-content"
      open={isOpenDrawer}
      onClose={handleCloseDrawer}
    >
      <InputWrapper>
        <Title>Редактирование</Title>
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
            value={value}
            status={!isValid ? 'error' : ''}
            maxLength={100}
            placeholder="Что вы хотите сделать"
            onPressEnter={handleEditTodo}
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
              value={date ? dayjs(date, dateFormat) : null}
              getPopupContainer={(t) => t.parentElement as HTMLElement}
              disabledDate={(current) => current && current.isBefore(today)}
              onChange={(newDate) => onDateChange(newDate ? newDate : null)}
              placeholder="Выберите дату"
            />
          </DateWrapperItem>

          <DateWrapperItem>
            <h3>Приоритетность</h3>
            <Switch checked={isPriority} onChange={onSwitchChange} />
          </DateWrapperItem>
        </DateWrapper>

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
