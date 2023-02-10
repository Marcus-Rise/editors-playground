import {Action} from './action';
import {
  ReactComponent as TextUnderlineOutline
} from '@admiral-ds/icons/build/redact/TextUnderlineOutline.svg';
import {ComponentProps, FC} from 'react';
import {IS_APPLE} from '../utils/environment.helper';

const hotKey = IS_APPLE ? '⌘+U' : 'Ctrl+U';
const tooltip = `Подчеркнутый ${hotKey}`;

type Props = Omit<ComponentProps<typeof Action>, "tooltip" | "children">;

const Underline: FC<Props> = (props) =>
  (
    <Action
      {...props}
      tooltip={tooltip}
    >
      <TextUnderlineOutline/>
    </Action>
  );

export {Underline};
