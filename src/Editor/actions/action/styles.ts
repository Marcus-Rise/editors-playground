import { IconButton } from '@admiral-ds/react-ui';
import { Tooltip as InternalTooltip } from '../../../Tooltip';
import styled from 'styled-components';

export const Tooltip = styled(InternalTooltip)<{ disabled?: boolean }>`
  display: ${({ disabled }) => disabled && 'none'};
`;

export const Root = styled(IconButton).attrs({
  dimension: 's'
})<{ isActive?: boolean }>`
  border-radius: 8px;
  background-color: ${({ isActive, theme }) =>
    isActive && theme.color['Opacity/Press']};
`;

export const Wrapper = styled.div`
  display: inline-flex;
`;
