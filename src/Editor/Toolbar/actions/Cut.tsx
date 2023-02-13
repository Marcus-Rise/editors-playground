import {ComponentProps, FC} from 'react';
import {Action} from './action';
import {ReactComponent as CutOutline} from '@admiral-ds/icons/build/service/CutOutline.svg';
import {IS_APPLE} from '../utils/environment.helper';

const hotKey = IS_APPLE ? '⌘+X' : 'Ctrl+X';
const tooltip = `Вырезать ${hotKey}`;

type Props = Omit<ComponentProps<typeof Action>, "tooltip" | "children">;

const Cut: FC<Props> = (props) =>
  (
    <Action {...props} tooltip={tooltip}>
      <CutOutline/>
    </Action>
  );

export {Cut};
