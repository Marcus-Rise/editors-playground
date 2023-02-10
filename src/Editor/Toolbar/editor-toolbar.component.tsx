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
  const {toggleBoldMark, toggleItalicMark, toggleUnderlineMark, copy, cut, paste} = useEditor();

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
        <Color onSelect={(color) => console.log("color", color)}/>
      </Group>
      <Group>
        <UnorderedList onClick={() => console.log("unordered")}/>
        <OrderedList onClick={() => console.log("ordered")}/>
      </Group>
      <Group>
        <Link value={{}} onSubmit={(dto) => console.log("link", dto)}/>
      </Group>
      <Group>
        <Undo onClick={() => console.log("undo")}/>
        <Redo onClick={() => console.log("redo")}/>
      </Group>
    </Root>
  );
};

export {EditorToolbar};
