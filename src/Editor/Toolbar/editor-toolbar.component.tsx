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
  Underline,
  Undo,
  UnorderedList
} from "./actions";
import {useEditor} from "../editor.hook";

const EditorToolbar: FC<ComponentProps<typeof Root>> = (props) => {
  const {
    editor,
    toggleBoldMark,
    toggleItalicMark,
    toggleUnderlineMark,
    toggleColorMark,
    toggleLinkMark,
    copy,
    cut,
    paste
  } = useEditor();

  return (
    <Root {...props}>
      <Group>
        <Cut onClick={cut}/>
        <Copy onClick={copy}/>
        <Paste onClick={paste}/>
      </Group>
      <Group>
        <Bold onClick={toggleBoldMark}/>
        <Italic onClick={toggleItalicMark}/>
        <Underline onClick={toggleUnderlineMark}/>
        <Color onSelect={toggleColorMark}/>
      </Group>
      <Group>
        <UnorderedList onClick={() => console.debug("unordered")}/>
        <OrderedList onClick={() => console.debug("ordered")}/>
      </Group>
      <Group>
        <Link onSubmit={toggleLinkMark}/>
      </Group>
      <Group>
        <Undo onClick={editor?.undo}/>
        <Redo onClick={editor?.redo}/>
      </Group>
    </Root>
  );
};

export {EditorToolbar};
