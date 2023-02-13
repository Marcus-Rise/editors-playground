import {CustomEditor, CustomElement} from "../types/slate";
import {Editor, Element, Transforms} from "slate";
import {useCallback} from "react";

type ElementType = CustomElement["type"];

const isBlockActive = (editor: CustomEditor, type: ElementType): boolean => {
  const {selection} = editor

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
  const isList = LIST_TYPES.includes(type);
  const isTable = type === "table";

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      Element.isElement(n) &&
      (LIST_TYPES.includes(n.type) || n.type === "table_cell"),
    split: true,
  });

  Transforms.unwrapNodes(editor, {
    match: n =>
      !Editor.isEditor(n) &&
      Element.isElement(n) &&
      n.type === "table",
    split: true,
  });

  let newProperties: Partial<Element>;

  if (isTable) {
    newProperties = {
      type: isActive ? 'paragraph' : 'table_cell'
    };
  } else {
    newProperties = {
      type: isActive ? 'paragraph' : isList ? 'list_item' : type,
    };
  }

  Transforms.setNodes<Element>(editor, newProperties);

  if (!isActive && isTable) {
    Transforms.wrapNodes(editor, {type: 'table', children: []})
    Transforms.wrapNodes(editor, {type: 'table_row', children: []})
  }

  if (!isActive && isList) {
    Transforms.wrapNodes(editor, {type: type, children: []})
  }
}

const useEditorElement = (editor: CustomEditor) => {
  const isListOrderedActive = useCallback(() => isBlockActive(editor, "list_ordered"), [editor]);

  const toggleListOrderedBlock = useCallback(() => toggleBlock(editor, "list_ordered"), [editor]);

  const isListUnOrderedActive = useCallback(() => isBlockActive(editor, "list_unordered"), [editor]);

  const toggleListUnOrderedBlock = useCallback(() => toggleBlock(editor, "list_unordered"), [editor]);

  const isTableActive = useCallback(() => isBlockActive(editor, "table"), [editor]);

  const toggleTableBlock = useCallback(() => toggleBlock(editor, "table"), [editor]);

  const removeTableRowBlock = useCallback(() => {
    Transforms.removeNodes(editor, {
      match: (n) => !Editor.isEditor(n) && Element.isElement(n) && n.type === "table_row"
    })
  }, [editor]);

  const addTableRowAfterBlock = useCallback(() => {
    console.debug("row after");
  }, []);

  const addTableRowBelowBlock = useCallback(() => {
    console.debug("row below");
  }, []);

  return {
    isListOrderedActive,
    toggleListOrderedBlock,
    isListUnOrderedActive,
    toggleListUnOrderedBlock,
    isTableActive,
    toggleTableBlock,
    removeTableRowBlock,
    addTableRowAfterBlock,
    addTableRowBelowBlock,
  };
};

export {useEditorElement};
