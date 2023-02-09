import {ComponentProps, FC} from 'react';
import {Action} from './action';
import {
  ReactComponent as TextItalicOutline
} from '@admiral-ds/icons/build/redact/TextItalicOutline.svg';
import {IS_APPLE} from '../utils/environment';

const hotKey = IS_APPLE ? '⌘+I' : 'Ctrl+I';
const tooltip = `Курсив ${hotKey}`;

type Props = Omit<ComponentProps<typeof Action>, "tooltip" | "children">;

const Italic: FC<Props> = (props) =>
  (
    <Action
      {...props}
      tooltip={tooltip}
    >
      <TextItalicOutline/>
    </Action>
  );

export {Italic};
