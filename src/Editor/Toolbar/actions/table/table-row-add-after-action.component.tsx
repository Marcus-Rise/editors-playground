import type {FC} from 'react';
import {ComponentProps} from "react";
import {
  ReactComponent as Icon
} from '@admiral-ds/icons/build/redact/RowInsertAfterOutline.svg';
import {Action} from "../action";

type Props = Omit<ComponentProps<typeof Action>, "tooltip" | "children">;

const TableRowAddAfterAction: FC<Props> = (props) => (
  <Action
    {...props}
    tooltip={`Добавить строку ниже`}
  >
    <Icon/>
  </Action>
);

export {TableRowAddAfterAction};
