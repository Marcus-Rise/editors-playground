import {Editor, Node, Text, Transforms} from "slate";
import {serialize} from "./utils/serialize.helper";
import {copyToClipboard, readFromClipboard} from "./Toolbar/utils/clipboard.helper";
import {deserialize} from "./utils/deserialize.helper";
import {LinkModalDto} from "./Toolbar/actions/Link/LinkModal";
import {FormattedText} from "../types/slate";
import {useSlate,} from "slate-react";
import {useCallback} from "react";

const isFormatActive = (editor: Editor, format: keyof FormattedText): boolean => {
  const [match] = Editor.nodes(editor, {
    match: (n: Node) => Text.isText(n) && !!n[format],
    mode: "all",
  })

  return !!match;
}

const useEditor = () => {
  const editor = useSlate();

  const isBoldMarkActive = useCallback(() => isFormatActive(editor, "bold"), [editor]);

  const isItalicMarkActive = useCallback(() => isFormatActive(editor, "italic"), [editor]);

  const isUnderlineMarkActive = useCallback(() => isFormatActive(editor, "underline"), [editor]);

  const isColorMarkActive = useCallback(() => isFormatActive(editor, "color"), [editor]);

  const isLinkMarkActive = useCallback(() => isFormatActive(editor, "href"), [editor]);

  const toggleBoldMark = useCallback(() => {
    const isActive = isBoldMarkActive();

    Transforms.setNodes(
      editor,
      {bold: isActive ? undefined : true},
      {match: (n) => Text.isText(n), split: true}
    )
  }, [editor, isBoldMarkActive]);

  const toggleItalicMark = useCallback(() => {
    const isActive = isItalicMarkActive();

    Transforms.setNodes(
      editor,
      {italic: isActive ? undefined : true},
      {match: (n) => Text.isText(n), split: true}
    )
  }, [editor, isItalicMarkActive]);

  const toggleUnderlineMark = useCallback(() => {
    const isActive = isUnderlineMarkActive();

    Transforms.setNodes(
      editor,
      {underline: isActive ? undefined : true},
      {match: (n) => Text.isText(n), split: true}
    )
  }, [editor, isUnderlineMarkActive]);

  const colorCurrentValue = useCallback((): FormattedText["color"] => {
    const [nodes] = Editor.nodes<FormattedText>(editor, {
      match: (n) => Text.isText(n) && !!n.color,
      mode: "all",
    });

    if (!nodes) {
      return;
    }

    const [node] = nodes;

    return node.color;
  }, [editor]);

  const toggleColorMark = useCallback((color: FormattedText["color"]) => {
    Transforms.setNodes(
      editor,
      {color: color},
      {match: (n) => Text.isText(n), split: true}
    )
  }, [editor]);

  const linkCurrentValue = useCallback((): FormattedText["href"] => {
    const [nodes] = Editor.nodes<FormattedText>(editor, {
      match: (n) => Text.isText(n) && !!n.href,
      mode: "all",
    });

    if (!nodes) {
      return;
    }

    const [node] = nodes;

    return node.href;
  }, [editor]);

  const toggleLinkMark = useCallback((dto: LinkModalDto) => {
    Transforms.setNodes(
      editor,
      {href: dto.link},
      {
        match: (n) => Text.isText(n), split: true
      },
    )
  }, [editor]);

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

    isBoldMarkActive,
    toggleBoldMark,

    isItalicMarkActive,
    toggleItalicMark,

    isUnderlineMarkActive,
    toggleUnderlineMark,

    colorCurrentValue,
    isColorMarkActive,
    toggleColorMark,

    linkCurrentValue,
    isLinkMarkActive,
    toggleLinkMark,

    copy,
    cut,
    paste,
  }
}

export {useEditor}
