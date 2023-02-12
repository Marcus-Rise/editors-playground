import {CustomEditor, CustomElement} from "../types/slate";
import {Editor, Element, Transforms} from "slate";
import {useCallback} from "react";

type ElementType = CustomElement["type"];

const isBlockActive = (editor: CustomEditor, type: ElementType): boolean => {
  const { selection } = editor

  if (!selection) {
    return false;
  }

  const [match] = Array.from(
    Editor.nodes(editor, {
      at: Editor.unhangRange(editor, selection),
      match: n =>
        !Editor.isEditor(n) &&
        Element.isElement(n) &&
        n.type === type,
    })
  )

  return !!match
}

const LIST_TYPES = ["list_ordered", "list_unordered"];

const toggleBlock = (editor: CustomEditor, type: ElementType) => {
  const isActive = isBlockActive(
    editor,
    type,
  )
  const isList = LIST_TYPES.includes(type)

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      Element.isElement(n) &&
      LIST_TYPES.includes(n.type),
    split: true,
  })
  const newProperties: Partial<Element> = {
    type: isActive ? 'paragraph' : isList ? 'list_item' : type,
  };

  Transforms.setNodes<Element>(editor, newProperties)

  if (!isActive && isList) {
    const block = { type: type, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}


const useEditorElement = (editor: CustomEditor) => {
  const isListOrderedActive = useCallback(() => isBlockActive(editor, "list_ordered"), [editor]);

  const toggleListOrderedBlock = useCallback(() => toggleBlock(editor, "list_ordered"), [editor]);

  const isListUnOrderedActive = useCallback(() => isBlockActive(editor, "list_unordered"), [editor]);

  const toggleListUnOrderedBlock = useCallback(() => toggleBlock(editor, "list_unordered"), [editor]);

  return {
    isListOrderedActive,
    toggleListOrderedBlock,
    isListUnOrderedActive,
    toggleListUnOrderedBlock,
  };
};

export {useEditorElement};
