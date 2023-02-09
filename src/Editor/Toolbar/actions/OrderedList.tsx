import {ComponentProps, FC} from 'react';
import {Action} from './action';
import {
  ReactComponent as ListNumberedOutline
} from '@admiral-ds/icons/build/redact/ListNumberedOutline.svg';


const tooltip = `Нумерованный список`;

type Props = Omit<ComponentProps<typeof Action>, "tooltip" | "children">;

const OrderedList: FC<Props> = (props) =>
  (
    <Action
      {...props}
      tooltip={tooltip}
    >
      <ListNumberedOutline/>
    </Action>
  );

export {OrderedList};
