import {ComponentProps, FC} from 'react';
import {Action} from './action';
import {ReactComponent as UndoOutline} from '@admiral-ds/icons/build/system/UndoOutline.svg';
import {IS_APPLE} from '../utils/environment.helper';

const hotKey = IS_APPLE ? '⌘+Z' : 'Ctrl+Z';
const tooltip = `Отменить ${hotKey}`;

type Props = Omit<ComponentProps<typeof Action>, "tooltip" | "children">;

const Undo: FC<Props> = (props) =>
  (
    <Action {...props} tooltip={tooltip}>
      <UndoOutline/>
    </Action>
  );

export {Undo};
