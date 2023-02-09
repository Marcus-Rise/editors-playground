import {ComponentProps, FC} from 'react';
import {Action} from './action';
import {
  ReactComponent as ListBulletedOutline
} from '@admiral-ds/icons/build/redact/ListBulletedOutline.svg';

const tooltip = `Маркированный список`;

type Props = Omit<ComponentProps<typeof Action>, "tooltip" | "children">;


const UnorderedList: FC<Props> = (props) =>
  (
    <Action
      {...props}
      tooltip={tooltip}
    >
      <ListBulletedOutline/>
    </Action>
  );

export {UnorderedList};
