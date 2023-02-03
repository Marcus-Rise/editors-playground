import type {ComponentProps, FC} from 'react';
import {Editable, Slate} from "slate-react";
import {RenderElement} from "./Elements";
import {RenderLeaf} from "./Leaf";
import {useEditor} from "./editor.hook";

type EditorProps = ComponentProps<typeof Slate>;
type EditorProp<Prop extends keyof EditorProps> = EditorProps[Prop];

type Props = { value?: EditorProp<"value">, onChange?: EditorProp<"onChange"> };
const SlateEditor: FC<Props> = ({ value= [{type: "paragraph", children: []}], onChange, }) => {
  const {editor, toggleCodeBlock, toggleBoldMark} = useEditor();

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      <div>
        <button
          onMouseDown={(event) => {
            event.preventDefault()
            toggleBoldMark();
          }}
        >
          Bold
        </button>
        <button
          onMouseDown={(event) => {
            event.preventDefault()
            toggleCodeBlock();
          }}
        >
          Code Block
        </button>
      </div>
      <Editable
        renderElement={RenderElement}
        renderLeaf={RenderLeaf}
        onKeyDown={(event) => {
          if (!event.ctrlKey) {
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

export {SlateEditor};
