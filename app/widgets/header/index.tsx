import { Button } from 'antd';
import { GoBellFill, GoPersonFill } from 'react-icons/go';
import { HeaderWrapper } from './styles';

const Header = () => {
  return (
    <HeaderWrapper>
      <Button type="text" shape="circle" size="large">
        <GoPersonFill size={24} color="#8c8c8c" />
      </Button>
      <h1>Мои дела</h1>
      <Button type="text" shape="circle" size="large">
        <GoBellFill size={24} color="#8c8c8c" />
      </Button>
    </HeaderWrapper>
  );
};

export default Header;
