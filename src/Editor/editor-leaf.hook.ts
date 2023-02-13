import {Editor} from "slate";
import {LinkModalDto} from "./Toolbar/actions/Link/LinkModal";
import {CustomEditor, FormattedText} from "../types/slate";
import {useCallback} from "react";

const isFormatActive = (editor: CustomEditor, format: keyof Omit<FormattedText, 'text'>): boolean => {
  const marks = Editor.marks(editor);

  return marks ? !!marks[format] : false;
}

const toggleFormat = (editor: CustomEditor, format: keyof Omit<FormattedText, 'text'>) => {
  const isActive = isFormatActive(editor, format);

  if (isActive) {
    Editor.removeMark(editor, format);
  } else {
    Editor.addMark(editor, format, true);
  }
}

const useEditorLeaf = (editor: CustomEditor) => {
  const isBoldMarkActive = useCallback(() => isFormatActive(editor, "bold"), [editor]);

  const isItalicMarkActive = useCallback(() => isFormatActive(editor, "italic"), [editor]);

  const isUnderlineMarkActive = useCallback(() => isFormatActive(editor, "underline"), [editor]);

  const isColorMarkActive = useCallback(() => isFormatActive(editor, "color"), [editor]);

  const isLinkMarkActive = useCallback(() => isFormatActive(editor, "href"), [editor]);

  const toggleBoldMark = useCallback(() => toggleFormat(editor, "bold"), [editor]);

  const toggleItalicMark = useCallback(() => toggleFormat(editor, "italic"), [editor]);

  const toggleUnderlineMark = useCallback(() => toggleFormat(editor, "underline"), [editor]);

  const colorCurrentValue = useCallback((): FormattedText["color"] => {
    const marks = Editor.marks(editor);

    return marks?.color;
  }, [editor]);

  const toggleColorMark = useCallback((color: FormattedText["color"]) => {
    Editor.addMark(editor, "color", color);
  }, [editor]);

  const linkCurrentValue = useCallback((): FormattedText["href"] => {
    const marks = Editor.marks(editor);

    return marks?.href;
  }, [editor]);

  const toggleLinkMark = useCallback((dto: LinkModalDto) => {
    Editor.addMark(editor, "href", dto.link);
  }, [editor]);

  return {
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
  }
}

export {useEditorLeaf}
