import {useContext} from "react";
import {Editor, Text, Transforms} from "slate";
import {EditorContext} from "./editor.context";

const useEditor = () => {
  const {editor} = useContext(EditorContext);

  const isBoldMarkActive = () => {
    if (!editor) {
      return;
    }

    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.bold === true,
      universal: true,
    })

    return !!match
  };

  const isCodeBlockActive = () => {
    if (!editor) {
      return;
    }

    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.type === 'code',
    })

    return !!match
  };

  const toggleBoldMark = () => {
    if (!editor) {
      return;
    }

    const isActive = isBoldMarkActive()
    Transforms.setNodes(
      editor,
      {bold: isActive ? undefined : true},
      {match: (n) => Text.isText(n), split: true}
    )
  };

  const toggleCodeBlock = () => {
    if (!editor) {
      return;
    }

    Transforms.setNodes(
      editor,
      {type: isCodeBlockActive() ? undefined : 'code'},
      // { match: (n: any) => Editor.isBlock(editor, n) }
    )
  };

  return {
    editor,
    toggleBoldMark,
    toggleCodeBlock,
  }
}

export {useEditor}
