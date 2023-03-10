import type {ComponentProps, FC} from 'react';
import {Group, Root} from "./styles";
import {
  Bold,
  Color,
  Copy,
  Cut,
  Italic,
  Link,
  OrderedList,
  Paste,
  Redo,
  TableAction, TableRowAddAfterAction,
  TableRowAddBeforeAction,
  TableRowRemoveAction,
  Underline,
  Undo,
  UnorderedList,
} from "./actions";
import {useEditor} from "../editor.hook";

const EditorToolbar: FC<ComponentProps<typeof Root>> = (props) => {
  const {
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
    toggleListOrderedBlock,
    isListOrderedActive,
    toggleListUnOrderedBlock,
    isListUnOrderedActive,
    isTableActive,
    toggleTableBlock,
    removeTableRowBlock,
    addTableRowBeforeBlock,
    addTableRowAfterBlock,
  } = useEditor();

  return (
    <Root {...props}>
      <Group>
        <Cut onClick={cut}/>
        <Copy onClick={copy}/>
        <Paste onClick={paste}/>
      </Group>
      <Group>
        <Bold onClick={toggleBoldMark} isActive={isBoldMarkActive()}/>
        <Italic onClick={toggleItalicMark} isActive={isItalicMarkActive()}/>
        <Underline onClick={toggleUnderlineMark} isActive={isUnderlineMarkActive()}/>
        <Color value={colorCurrentValue()} onSelect={toggleColorMark}
               isActive={isColorMarkActive()}/>
      </Group>
      <Group>
        <UnorderedList disabled={isTableActive()} isActive={isListUnOrderedActive()}
                       onClick={toggleListUnOrderedBlock}/>
        <OrderedList disabled={isTableActive()} isActive={isListOrderedActive()}
                     onClick={toggleListOrderedBlock}/>
      </Group>
      <Group>
        <Link value={linkCurrentValue()} onSubmit={toggleLinkMark} isActive={isLinkMarkActive()}/>
      </Group>
      <Group>
        <Undo onClick={editor.undo}/>
        <Redo onClick={editor.redo}/>
      </Group>
      <Group>
        <TableAction disabled={isListUnOrderedActive() || isListOrderedActive()} isActive={isTableActive()} onClick={toggleTableBlock}/>
        <TableRowAddAfterAction disabled={!isTableActive()} onClick={addTableRowAfterBlock}/>
        <TableRowAddBeforeAction disabled={!isTableActive()} onClick={addTableRowBeforeBlock}/>
        <TableRowRemoveAction disabled={!isTableActive()} onClick={removeTableRowBlock}/>
      </Group>
    </Root>
  );
};

export {EditorToolbar};
