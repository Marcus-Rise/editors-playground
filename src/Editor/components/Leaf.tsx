// Define a React component to render leaves with bold text.
import {RenderLeafProps} from "slate-react";
import {CSSProperties} from "react";

const RenderLeaf = (props: RenderLeafProps) => {
  const style: CSSProperties = {
    fontWeight: props.leaf.bold ? 'bold' : 'normal',
    fontStyle: props.leaf.italic ? 'italic' : 'normal',
    textDecoration: props.leaf.underline ? 'underline' : 'none',
    color: props.leaf.color,
  };

  if (props.leaf.href) {
    return (
      <a
        {...props.attributes}
        style={style}
        href={props.leaf.href}
      >
        {props.children}
      </a>
    );
  }

  return (
    <span
      {...props.attributes}
      style={style}
    >
      {props.children}
    </span>
  );
}

export {RenderLeaf}
