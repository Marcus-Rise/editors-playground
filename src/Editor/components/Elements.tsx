import {RenderElementProps} from "slate-react/dist/components/editable";

const DefaultElement = (props: RenderElementProps) => {
  return <p {...props.attributes}>{props.children}</p>
}

const CodeElement = (props: RenderElementProps) => {
  return (
    <pre {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  )
}

const RenderElement = (props: RenderElementProps) => {
  switch (props.element.type) {
    case "code":
      return <CodeElement {...props} />
    default:
      return <DefaultElement {...props} />
  }
};

export {RenderElement}
