import styled from 'styled-components';
import { PositionInPortal, typography } from '@admiral-ds/react-ui';

const TOOLTIP_PADDING = '4px 8px';

export const TooltipWrapper = styled.div`
  box-sizing: border-box;
  opacity: 0;
  transition-delay: 200ms;
  transition-property: opacity;
  align-self: center;
  width: max-content;
  min-width: max-content;
  pointer-events: initial;
`;

export const TooltipContainer = styled.div`
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.color['Neutral/Neutral 80']};
  ${typography['Body/Body 2 Short']}
  color: ${({ theme }) => theme.color['Neutral/Neutral 00']};
  border-radius: 1rem;
  ${(props) => props.theme.shadow['Shadow 04']}
  padding: ${TOOLTIP_PADDING};
  max-width: min(488px, calc(100vw - 16px));
  word-break: break-word;
`;

export const FakeTarget = styled.div`
  pointer-events: none;
  height: 100%;
  width: 100%;
  flex: 0 0 auto;
`;

export const Portal = styled(PositionInPortal)<{ flexDirection?: any }>`
  display: flex;
  flex-wrap: nowrap;
  ${({ flexDirection }) =>
    flexDirection ? `flex-direction: ${flexDirection};` : ''}
`;
