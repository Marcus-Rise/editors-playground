import type {ComponentProps, FC} from 'react';
import {Group, Root} from "./styles";
import {
  Bold, Color,
  Copy,
  Cut,
  Italic,
  OrderedList,
  Paste,
  Redo,
  Underline,
  Undo,
  UnorderedList
} from "../actions";
import {useEditor} from "../editor.hook";

const EditorToolbar: FC<ComponentProps<typeof Root>> = (props) => {
  const {toggleBoldMark} = useEditor();

  return (
    <Root {...props}>
      <Group>
        <Cut onClick={() => console.log("cut")}/>
        <Copy onClick={() => console.log("copy")}/>
        <Paste onClick={() => console.log("paste")}/>
      </Group>
      <Group>
        <Bold onClick={toggleBoldMark}/>
        <Italic onClick={() => console.log("italic")}/>
        <Underline onClick={() => console.log("underline")}/>
        <Color onSelect={(color) => console.log("color", color)} />
      </Group>
      <Group>
        <UnorderedList onClick={() => console.log("unordered")}/>
        <OrderedList onClick={() => console.log("ordered")}/>
      </Group>
      {/*<Group>
        <Link onClick={() => console.log("link")}/>
      </Group>*/}
      <Group>
        <Undo onClick={() => console.log("undo")}/>
        <Redo onClick={() => console.log("redo")}/>
      </Group>
    </Root>
  );
};

export {EditorToolbar};
