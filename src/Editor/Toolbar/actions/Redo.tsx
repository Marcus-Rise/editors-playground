import {ComponentProps, FC} from 'react';
import {Action} from './action';
import {ReactComponent as UndoOutline} from '@admiral-ds/icons/build/system/UndoOutline.svg';
import styled from 'styled-components';
import {IS_APPLE} from '../utils/environment';

const Icon = styled(UndoOutline)`
  transform: scale(-1, 1);
`;

const hotKey = IS_APPLE ? '⌘+Shift+Z' : 'Ctrl+Y';
const tooltip = `Повторить ${hotKey}`;

type Props = Omit<ComponentProps<typeof Action>, "tooltip" | "children">;

const Redo: FC<Props> = (props) =>
  (
    <Action {...props} tooltip={tooltip}>
      <Icon/>
    </Action>
  );

export {Redo};
