import {ComponentProps, FC} from 'react';
import {Action} from './action';
import {
  ReactComponent as TextBoldOutline
} from '@admiral-ds/icons/build/redact/TextBoldOutline.svg';
import {IS_APPLE} from '../utils/environment.helper';

const hotKey = IS_APPLE ? '⌘+B' : 'Ctrl+B';
const tooltip = `Жирный ${hotKey}`;

type Props = Omit<ComponentProps<typeof Action>, "tooltip" | "children">;

const Bold: FC<Props> = (props) =>
  (
    <Action
      {...props}
      tooltip={tooltip}
    >
      <TextBoldOutline/>
    </Action>
  );

export {Bold};
