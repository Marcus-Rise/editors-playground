import {RenderElementProps} from "slate-react/dist/components/editable";

const DefaultElement = (props: RenderElementProps) => {
  return <p {...props.attributes}>{props.children}</p>
}

const RenderElement = (props: RenderElementProps) => {
  switch (props.element.type) {
    default:
      return <DefaultElement {...props} />
  }
};

export {RenderElement}
