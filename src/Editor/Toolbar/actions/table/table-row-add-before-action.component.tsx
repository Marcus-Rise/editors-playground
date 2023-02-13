import type {FC} from 'react';
import {ComponentProps} from "react";
import {
  ReactComponent as AddRowBelowIcon
} from '@admiral-ds/icons/build/redact/RowInsertBelowOutline.svg';
import {Action} from "../action";

type Props = Omit<ComponentProps<typeof Action>, "tooltip" | "children">;

const TableRowAddBelowAction: FC<Props> = (props) => (
  <Action
    {...props}
    tooltip={`Добавить строку вверх`}
  >
    <AddRowBelowIcon/>
  </Action>
);

export {TableRowAddBelowAction};
