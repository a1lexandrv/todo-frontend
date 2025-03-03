import styled from 'styled-components';

interface ItemWrapperProps {
  isCompleted: boolean;
  isLoading?: boolean;
}

export const ItemWrapper = styled.div<ItemWrapperProps>`
  border-radius: 16px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  background-color: ${({ isCompleted }) =>
    isCompleted ? '#d9f7be' : '#fafafa'};
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease-in-out;
  position: relative; /* Для позиционирования выпадающего меню */
`;

export const OptionsWrapper = styled.div`
  position: relative;
`;

export const OptionsButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px;
  color: #8c8c8c;

  &:hover {
    color: #595959;
  }
`;

export const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  z-index: 10;
  width: 140px;
  padding: 8px;
`;

export const MenuItem = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: #f0f0f0;
  }
`;

export const DropdownListItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
`;
