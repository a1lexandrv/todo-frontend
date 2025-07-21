import { Button, Tooltip } from 'antd';
import { GoBellFill, GoPersonFill } from 'react-icons/go';
import { UTF } from '~/shared/constants/UTF';
import { HeaderWrapper } from './styles';

const Header = () => {
  return (
    <HeaderWrapper>
      <Tooltip
        placement="topLeft"
        title="Тут вы сможете изменять настройки профиля, управлять подпиской и многое другое"
      >
        <Button type="text" shape="circle" size="large">
          <GoPersonFill size={24} color="#8c8c8c" />
        </Button>
      </Tooltip>
      <h1>Мои дела</h1>
      <Tooltip
        placement="topRight"
        title={`Тут будут храниться уведомления и${UTF.nbsp}их настройки`}
      >
        <Button type="text" shape="circle" size="large">
          <GoBellFill size={24} color="#8c8c8c" />
        </Button>
      </Tooltip>
    </HeaderWrapper>
  );
};

export default Header;
