import type {FC} from 'react';
import {ComponentProps} from "react";
import {
  ReactComponent as Icon
} from '@admiral-ds/icons/build/redact/RowInsertBelowOutline.svg';
import {Action} from "../action";

type Props = Omit<ComponentProps<typeof Action>, "tooltip" | "children">;

const TableRowAddBeforeAction: FC<Props> = (props) => (
  <Action
    {...props}
    tooltip={`Добавить строку выше`}
  >
    <Icon/>
  </Action>
);

export {TableRowAddBeforeAction};
