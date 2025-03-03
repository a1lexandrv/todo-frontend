import styled, { keyframes } from 'styled-components';

const checkmarkAnimation = keyframes`
  from {
    opacity: 0;
    transform: rotate(45deg) scale(0);
  }
  to {
    opacity: 1;
    transform: rotate(45deg) scale(1);
  }
`;

export const StyledCustomCheckbox = styled.label`
  display: flex;
  position: relative;
  cursor: pointer;
  user-select: none;

  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
`;

export const Checkmark = styled.span`
  flex-shrink: 0;
  position: relative;
  height: 18px;
  width: 18px;
  border: 2px solid #8c8c8c;
  border-radius: 50%;
  transition: background-color 0.3s, border-color 0.3s;

  &:hover {
    border-color: #73d13d;
  }

  input:checked + & {
    background-color: #73d13d;
    border-color: #73d13d;

    &::after {
      content: '';
      position: absolute;
      display: block;
      left: 6px;
      top: 2px;
      width: 5px;
      height: 10px;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
      animation: ${checkmarkAnimation} 0.3s ease-in-out;
    }
  }
`;

export const CheckboxLabel = styled.span`
  word-break: break-word;
  margin-left: 8px;
`;
