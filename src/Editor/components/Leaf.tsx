// Define a React component to render leaves with bold text.
import {RenderLeafProps} from "slate-react";

const RenderLeaf = (props: RenderLeafProps) => {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  )
}

export {RenderLeaf}
