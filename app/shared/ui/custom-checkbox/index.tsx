import type { Todo } from '~/shared/types/todo';
import { CheckboxLabel, Checkmark, StyledCustomCheckbox } from './styles';

interface CustomCheckboxProps {
  todo: Todo;
  disabled: boolean;
  toggleTodo: (param: number) => void;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({
  todo,
  disabled,
  toggleTodo,
}) => {
  return (
    <StyledCustomCheckbox>
      <input
        type="checkbox"
        checked={todo.completed}
        disabled={disabled}
        onChange={() => toggleTodo(todo.id)}
      />
      <Checkmark />
      <CheckboxLabel>{todo.title}</CheckboxLabel>
    </StyledCustomCheckbox>
  );
};

export default CustomCheckbox;
