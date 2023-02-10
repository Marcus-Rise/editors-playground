// Define a React component to render leaves with bold text.
import {RenderLeafProps} from "slate-react";

const RenderLeaf = (props: RenderLeafProps) =>
  (
    <span
      {...props.attributes}
      style={{
        fontWeight: props.leaf.bold ? 'bold' : 'normal',
        fontStyle: props.leaf.italic ? 'italic' : 'normal',
        textDecoration: props.leaf.underline ? 'underline' : 'none',
        color: props.leaf.color,
      }}
    >
      {props.children}
    </span>
  )

export {RenderLeaf}
