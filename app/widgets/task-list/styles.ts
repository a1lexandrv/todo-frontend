import styled from 'styled-components';

export const ListWrapper = styled.div`
  padding: 4px 24px 12px;
  max-height: 100%;
  overflow-y: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const EmptyState = styled.div`
  padding: 0 24px 12px;
  color: #8c8c8c;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;
