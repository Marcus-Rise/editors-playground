import type {FC} from 'react';
import {ComponentProps} from "react";
import {
  ReactComponent as Icon
} from '@admiral-ds/icons/build/redact/RowDeleteOutline.svg';
import {Action} from "../action";

type Props = Omit<ComponentProps<typeof Action>, "tooltip" | "children">;

const TableRowRemoveAction: FC<Props> = (props) => (
  <Action
    {...props}
    tooltip={'Удалить строку'}
  >
    <Icon/>
  </Action>
);

export {TableRowRemoveAction};
