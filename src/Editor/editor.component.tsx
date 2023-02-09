import type {ComponentProps, FC} from 'react';
import {Editable, Slate} from "slate-react";
import {RenderElement} from "./components/Elements";
import {RenderLeaf} from "./components/Leaf";
import {useEditor} from "./editor.hook";

type EditorProps = ComponentProps<typeof Slate>;
type EditorProp<Prop extends keyof EditorProps> = EditorProps[Prop];

type Props = { value?: EditorProp<"value">, onChange?: EditorProp<"onChange"> };

const Editor: FC<Props> = ({ value= [{type: "paragraph", children: []}], onChange, }) => {
  const {editor, toggleCodeBlock, toggleBoldMark} = useEditor();

  if (!editor) {
    return null;
  }

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      <Editable
        renderElement={RenderElement}
        renderLeaf={RenderLeaf}
        onKeyDown={(event) => {
          if (!event.ctrlKey && !event.metaKey) {
            return;
          }

          switch (event.key) {
            case '`': {
              // Prevent the "`" from being inserted by default.

              event.preventDefault()
              toggleCodeBlock();
              break;
            }
            case 'b': {
              event.preventDefault()
              toggleBoldMark();
              break;
            }
          }
        }}
      />
    </Slate>
  );
};

export {Editor};
