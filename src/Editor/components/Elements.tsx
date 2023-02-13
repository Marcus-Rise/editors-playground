import {RenderElementProps} from "slate-react/dist/components/editable";
import styled from "styled-components";

const DefaultElement = (props: RenderElementProps) => <p {...props.attributes}>{props.children}</p>

const ListItemElement = (props: RenderElementProps) =>
  <li {...props.attributes}>{props.children}</li>

const ListOrderedElement = (props: RenderElementProps) =>
  <ol {...props.attributes}>{props.children}</ol>

const ListUnOrderedElement = (props: RenderElementProps) =>
  <ul {...props.attributes}>{props.children}</ul>

const Table = styled.table`
  border-collapse: collapse;
`;

const TableElement = (props: RenderElementProps) =>
  <Table {...props.attributes}>
    <tbody>{props.children}</tbody>
  </Table>;

const TableRowElement = (props: RenderElementProps) =>
  <tr {...props.attributes}>{props.children}</tr>;

const TableCell = styled.td`
  border: 0.1rem solid ${(props) => props.theme.color['Neutral/Neutral 90']};
  padding: 1rem;
`;

const TableCellElement = (props: RenderElementProps) =>
  <TableCell {...props.attributes}>{props.children}</TableCell>;

const RenderElement = (props: RenderElementProps) => {
  switch (props.element.type) {
    case "list_ordered" :
      return <ListOrderedElement {...props}/>
    case "list_unordered" :
      return <ListUnOrderedElement {...props}/>
    case "list_item" :
      return <ListItemElement {...props}/>
    case "table":
      return <TableElement {...props}/>
    case "table_row":
      return <TableRowElement {...props}/>
    case "table_cell":
      return <TableCellElement {...props}/>
    default:
      return <DefaultElement {...props} />
  }
};

export {RenderElement}
