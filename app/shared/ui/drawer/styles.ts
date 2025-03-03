import styled from 'styled-components';

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.15);
  z-index: 999;
  transition: opacity 0.3s ease-in-out;
`;

export const DrawerWrapper = styled.div<{ open: boolean; height: string }>`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: ${({ height }) => height};
  background: white;
  border-radius: 16px 16px 0 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  transform: translateY(${({ open }) => (open ? '0%' : '100%')});
  transition: transform 0.3s ease-in-out;
`;

export const DrawerContent = styled.div`
  padding: 34px 24px 64px;
`;

export const Handle = styled.div`
  width: 40px;
  height: 5px;
  background: #ccc;
  border-radius: 999px;
  margin: 10px auto;
`;
