import {useMemo} from "react";
import {withReact} from "slate-react";
import {withHistory} from "slate-history";
import {createEditor, Editor, Text, Transforms} from "slate";

const useEditor = () => {
  const editor = useMemo(() => withReact(withHistory(createEditor())), [])

  const isBoldMarkActive = () => {
    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.bold === true,
      universal: true,
    })

    return !!match
  };

  const isCodeBlockActive = () => {
    const [match] = Editor.nodes(editor, {
      match: (n : any) => n.type === 'code',
    })

    return !!match
  };

  const toggleBoldMark = () => {
    const isActive = isBoldMarkActive()
    Transforms.setNodes(
      editor,
      { bold: isActive ? undefined : true },
      { match: (n) => Text.isText(n), split: true }
    )
  };

  const toggleCodeBlock = () => {
    Transforms.setNodes(
      editor,
      { type: isCodeBlockActive() ? undefined : 'code' },
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
