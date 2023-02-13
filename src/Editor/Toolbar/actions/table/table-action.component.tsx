import type {FC} from 'react';
import { ReactComponent as TableIcon } from '@admiral-ds/icons/build/redact/TableOutline.svg';
import {ComponentProps} from "react";
import {Action} from "../action";

type Props = Omit<ComponentProps<typeof Action>, "tooltip" | "children">;

const TableAction: FC<Props> = (props) => (
  <Action
    {...props}
    tooltip={`Таблица`}
  >
    <TableIcon/>
  </Action>
);

export {TableAction};
