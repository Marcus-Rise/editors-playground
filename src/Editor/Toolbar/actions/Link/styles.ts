import { Button } from '@admiral-ds/react-ui';
import styled, { css } from 'styled-components';

export const overlayStyles = css`
  backdrop-filter: none;
`;

export const Fieldset = styled.fieldset`
  display: grid;
  grid-gap: 20px;
  border: 0;
`;

export const AddButton = styled(Button).attrs({
  dimension: 'm'
})``;

export const CanselButton = styled(Button).attrs({
  dimension: 'm',
  appearance: 'secondary'
})``;
