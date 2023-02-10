import type {ComponentProps, FC, KeyboardEventHandler} from 'react';
import {Editable, Slate} from "slate-react";
import {RenderElement} from "./components/Elements";
import {RenderLeaf} from "./components/Leaf";
import {useEditor} from "./editor.hook";

type EditorProps = ComponentProps<typeof Slate>;
type EditorProp<Prop extends keyof EditorProps> = EditorProps[Prop];

type Props = { value?: EditorProp<"value">, onChange?: EditorProp<"onChange"> };

const Editor: FC<Props> = ({value = [{type: "paragraph", children: []}], onChange,}) => {
  const {
    editor,
    toggleCodeBlock,
    toggleBoldMark,
    toggleItalicMark,
    toggleUnderlineMark,
    copy,
    cut,
    paste
  } = useEditor();

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
      case 'i': {
        event.preventDefault()
        toggleItalicMark();
        break;
      }
      case 'u': {
        event.preventDefault()
        toggleUnderlineMark();
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
      case 'z': {
        event.preventDefault();

        if (event.shiftKey) {
          editor.redo();
        } else {
          editor.undo();
        }

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
