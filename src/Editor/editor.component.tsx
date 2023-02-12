import type {FC, KeyboardEventHandler} from 'react';
import {useCallback} from "react";
import {Editable} from "slate-react";
import {RenderElement} from "./components/Elements";
import {RenderLeaf} from "./components/Leaf";
import {useEditor} from "./editor.hook";

const Editor: FC = () => {
  const {
    editor,
    toggleBoldMark,
    toggleItalicMark,
    toggleUnderlineMark,
    copy,
    cut,
    paste
  } = useEditor();

  const handleHotKeys: KeyboardEventHandler = useCallback((event) => {
    if (!event.ctrlKey && !event.metaKey) {
      return;
    }

    switch (event.key) {
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
  }, [copy, cut, editor, paste, toggleBoldMark, toggleItalicMark, toggleUnderlineMark]);

  return (
    <Editable
      renderElement={RenderElement}
      renderLeaf={RenderLeaf}
      onKeyDown={handleHotKeys}
    />
  );
};

export {Editor};
