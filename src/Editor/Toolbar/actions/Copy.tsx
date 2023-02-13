import {ComponentProps, FC} from 'react';
import {Action} from './action';
import {ReactComponent as CopyOutline} from '@admiral-ds/icons/build/documents/CopyOutline.svg';
import {IS_APPLE} from '../utils/environment.helper';

const hotKey = IS_APPLE ? '⌘+C' : 'Ctrl+C';
const tooltip = `Копировать ${hotKey}`;

type Props = Omit<ComponentProps<typeof Action>, "tooltip" | "children">;

const Copy: FC<Props> = (props) =>
  (
    <Action {...props} tooltip={tooltip}>
      <CopyOutline/>
    </Action>
  );

export {Copy};
