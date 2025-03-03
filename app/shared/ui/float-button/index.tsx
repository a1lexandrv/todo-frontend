import { ButtonWrapper } from './styles';

interface FloatButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const FloatButton: React.FC<FloatButtonProps> = ({ children, onClick }) => {
  return <ButtonWrapper onClick={onClick}>{children}</ButtonWrapper>;
};

export default FloatButton;
