import {RenderElementProps} from "slate-react/dist/components/editable";

const DefaultElement = (props: RenderElementProps) => <p {...props.attributes}>{props.children}</p>

const ListItemElement = (props: RenderElementProps) =>
  <li {...props.attributes}>{props.children}</li>

const ListOrderedElement = (props: RenderElementProps) =>
  <ol {...props.attributes}>{props.children}</ol>

const ListUnOrderedElement = (props: RenderElementProps) =>
  <ul {...props.attributes}>{props.children}</ul>

const RenderElement = (props: RenderElementProps) => {
  switch (props.element.type) {
    case "list_ordered" :
      return <ListOrderedElement {...props}/>
    case "list_unordered" :
      return <ListUnOrderedElement {...props}/>
    case "list_item" :
      return <ListItemElement {...props}/>
    default:
      return <DefaultElement {...props} />
  }
};

export {RenderElement}
