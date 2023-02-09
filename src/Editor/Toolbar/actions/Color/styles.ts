import styled from 'styled-components';
import Container from '../../../../components/Container';
import { Dropdown as DropdownInternal } from '@admiral-ds/react-ui';

export const Dropdown = styled(DropdownInternal)`
  width: 100px;
`;

export const ColorItem = styled.div<{ color: string }>`
  border-radius: 50%;
  width: 18px;
  height: 18px;

  background-color: ${({ theme, color }) => theme.color[color]};
  transition: transform 100ms ease;

  cursor: pointer;

  &:hover {
    transform: scale(1.5);
  }
`;

export const ColorContainer = styled(Container).attrs({
  padding: '14px 12px'
})`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 8px;
`;
