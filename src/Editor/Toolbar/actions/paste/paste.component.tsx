import {ComponentProps, FC} from 'react';
import {Action} from '../action';
import {ReactComponent as PasteOutline} from './assets/paste.svg';
import {IS_APPLE} from '../../utils/environment.helper';

const hotKey = IS_APPLE ? '⌘+V' : 'Ctrl+V';
const tooltip = `Вставить ${hotKey}`;

type Props = Omit<ComponentProps<typeof Action>, "tooltip" | "children">;

const Paste: FC<Props> = (props) =>
  (
    <Action {...props} tooltip={tooltip}>
      <PasteOutline/>
    </Action>
  );

export {Paste};
