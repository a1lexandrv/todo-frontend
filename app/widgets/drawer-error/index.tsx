import Drawer from '~/shared/ui/drawer';
import type { DrawerProps } from '~/shared/ui/drawer';

import { BsFillXCircleFill } from 'react-icons/bs';
import { UTF } from '~/shared/constants/UTF';
import { ContentWrapper } from './styles';
import Button from '~/shared/ui/button';

type TaskDrawerErrorProps = Pick<DrawerProps, 'open' | 'onClose'>;

const TaskDrawerError: React.FC<TaskDrawerErrorProps> = ({ open, onClose }) => {
  return (
    <Drawer height="fit-content" open={open} onClose={onClose}>
      <ContentWrapper>
        <BsFillXCircleFill size={32} />
        <h2>Возникла ошибка</h2>
        <p>
          Скорее всего мы уже знаем об этой проблеме и{UTF.nbsp}работаем над ее
          решением
        </p>
        <Button onClick={onClose} text="Понятно" />
      </ContentWrapper>
    </Drawer>
  );
};

export default TaskDrawerError;
