import {serialize} from "./utils/serialize.helper";
import {copyToClipboard, readFromClipboard} from "./Toolbar/utils/clipboard.helper";
import {deserialize} from "./utils/deserialize.helper";
import {useSlate,} from "slate-react";
import {useCallback} from "react";
import {useEditorLeaf} from "./editor-leaf.hook";
import {useEditorElement} from "./editor-element.hook";

const useEditor = () => {
  const editor = useSlate();

  const elementUtils = useEditorElement(editor);
  const leafUtils = useEditorLeaf(editor);

  const copy = useCallback(() => {
    const fragment = editor.getFragment();

    console.debug("copy", fragment);

    const html = fragment.map((node) => serialize(node)).join('\n');

    console.debug("copy html", html)

    copyToClipboard(html);
  }, [editor]);

  const cut = useCallback(() => {
    copy();

    editor.deleteFragment();
  }, [copy, editor]);

  const paste = useCallback(async () => {
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
  }, [editor])

  return {
    editor,

    ...elementUtils,
    ...leafUtils,

    copy,
    cut,
    paste,
  }
}

export {useEditor}
