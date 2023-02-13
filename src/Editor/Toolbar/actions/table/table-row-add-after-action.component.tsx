import type {FC} from 'react';
import {ComponentProps} from "react";
import {
  ReactComponent as AddRowAfterIcon
} from '@admiral-ds/icons/build/redact/RowInsertAfterOutline.svg';
import {Action} from "../action";

type Props = Omit<ComponentProps<typeof Action>, "tooltip" | "children">;

const TableRowAddAfterAction: FC<Props> = (props) => (
  <Action
    {...props}
    tooltip={`Добавить строку вниз`}
  >
    <AddRowAfterIcon/>
  </Action>
);

export {TableRowAddAfterAction};
