import { Button as AntdButton } from 'antd';
import type { BaseButtonProps } from 'antd/es/button/button';

type ButtonProps = BaseButtonProps & {
  text: string;
  backgroundColor?: string;
  type?: 'primary' | 'dashed' | 'text' | 'link';
  loading?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

const Button: React.FC<ButtonProps> = ({
  text,
  type,
  onClick,
  loading,
  disabled,
  backgroundColor,
}) => {
  return (
    <AntdButton
      style={{
        backgroundColor: backgroundColor,
        padding: '24px',
        borderRadius: '16px',
        width: '100%',
      }}
      onClick={onClick}
      loading={loading}
      disabled={disabled}
      size="large"
      type={type}
    >
      <p style={{ fontSize: '16px' }}>{text}</p>
    </AntdButton>
  );
};

export default Button;
