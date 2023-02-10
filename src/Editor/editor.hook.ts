import {useContext} from "react";
import {Editor, Text, Transforms} from "slate";
import {EditorContext} from "./editor.context";
import {serialize} from "./utils/serialize.helper";
import {copyToClipboard, readFromClipboard} from "./Toolbar/utils/clipboard.helper";
import {deserialize} from "./utils/deserialize.helper";

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

  const isItalicMarkActive = () => {
    if (!editor) {
      return;
    }

    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.italic === true,
      universal: true,
    })

    return !!match
  };

  const isUnderlineMarkActive = () => {
    if (!editor) {
      return;
    }

    const [match] = Editor.nodes(editor, {
      match: (n: any) => n.underline === true,
      universal: true,
    })

    return !!match
  };

  const isColorMarkActive = () => {
    if (!editor) {
      return;
    }

    const [match] = Editor.nodes(editor, {
      match: (n: any) => !!n.color,
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

    const isActive = isBoldMarkActive();

    Transforms.setNodes(
      editor,
      {bold: isActive ? undefined : true},
      {match: (n) => Text.isText(n), split: true}
    )
  };

  const toggleItalicMark = () => {
    if (!editor) {
      return;
    }

    const isActive = isItalicMarkActive();

    Transforms.setNodes(
      editor,
      {italic: isActive ? undefined : true},
      {match: (n) => Text.isText(n), split: true}
    )
  };

  const toggleUnderlineMark = () => {
    if (!editor) {
      return;
    }

    const isActive = isUnderlineMarkActive();

    Transforms.setNodes(
      editor,
      {underline: isActive ? undefined : true},
      {match: (n) => Text.isText(n), split: true}
    )
  };

  const toggleColorMark = (color: string) => {
    if (!editor) {
      return;
    }

    const isActive = isColorMarkActive();

    Transforms.setNodes(
      editor,
      {color: isActive ? undefined : color},
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

  const copy = () => {
    if (!editor) {
      return null;
    }

    const fragment = editor.getFragment();

    console.debug("copy", fragment);

    const html = fragment.map((node) => serialize(node)).join('\n');

    console.debug("copy html", html)

    copyToClipboard(html);
  };

  const cut = () => {
    if (!editor) {
      return null;
    }

    copy();

    editor.deleteFragment();
  };

  const paste = async () => {
    if (!editor) {
      return null;
    }

    const html = await readFromClipboard();

    console.debug("paste restored html", html);

    const document = new DOMParser().parseFromString(html, 'text/html')

    const fragment = deserialize(document.body);

    console.debug("paste", fragment);

    if (Array.isArray(fragment)) {
      editor.insertFragment(fragment);
    } else {
      editor.insertNode(fragment);
    }
  }

  return {
    editor,
    toggleBoldMark,
    toggleItalicMark,
    toggleUnderlineMark,
    toggleColorMark,
    toggleCodeBlock,
    copy,
    cut,
    paste,
  }
}

export {useEditor}
