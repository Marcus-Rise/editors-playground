import type {ComponentProps, FC, KeyboardEventHandler} from 'react';
import {Editable, Slate} from "slate-react";
import {RenderElement} from "./components/Elements";
import {RenderLeaf} from "./components/Leaf";
import {useEditor} from "./editor.hook";
import {Simulate} from "react-dom/test-utils";
import paste = Simulate.paste;

type EditorProps = ComponentProps<typeof Slate>;
type EditorProp<Prop extends keyof EditorProps> = EditorProps[Prop];

type Props = { value?: EditorProp<"value">, onChange?: EditorProp<"onChange"> };

const Editor: FC<Props> = ({value = [{type: "paragraph", children: []}], onChange,}) => {
  const {editor, toggleCodeBlock, toggleBoldMark, copy, cut, paste} = useEditor();

  if (!editor) {
    return null;
  }

  const handleHotKeys: KeyboardEventHandler = (event) => {
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
      case 'c': {
        event.preventDefault();
        copy();
        break;
      }
      case 'x': {
        event.preventDefault();
        cut();
        break;
      }
      case 'v': {
        event.preventDefault();
        paste();
        break;
      }
    }
  };

  return (
    <Slate editor={editor} value={value} onChange={onChange}>
      <Editable
        renderElement={RenderElement}
        renderLeaf={RenderLeaf}
        onKeyDown={handleHotKeys}
      />
    </Slate>
  );
};

export {Editor};
