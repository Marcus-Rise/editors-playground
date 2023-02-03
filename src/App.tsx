import React, {FC, useState} from 'react';
import initialData from './data.json'
import Editor from "./components/Editor";
import {EditorDto, EditorDtoFactory, ServerDto, ServerDtoFactory} from "./dto";
import {ServerDtoForm} from "./components/ServerDtoForm";
import {SlateEditor} from "./components/slate";
import {Descendant} from "slate";

const initialValue: Array<Descendant> = [{
  type: "paragraph",
  children: [{
    text: "A line of text in a paragraph.",
  }],
}];

const App: FC = () => {
  const [data, setData] = useState<EditorDto>(initialData.blocks as EditorDto);
  const [serverDto, setServerDto] = useState(`<p>awdwada</p>`);

  const processEditorData = (data: EditorDto): void => {
    console.debug("processEditorData", "blocks", data);

    const dto = ServerDtoFactory.fromEditorDto(data);

    console.debug("processEditorData", "result", dto);

    setServerDto(dto);
  };

  const processServerDto = (dto: ServerDto) => {
    console.debug("processServerDto", "dto", dto);

    const editorDto = EditorDtoFactory.fromServerDto(dto);

    console.debug("processServerDto", "editorDto", editorDto);

    setData(editorDto);
  }

  return (
    <main>
      {/*<ServerDtoForm onChange={processServerDto} defaultValue={serverDto}/>*/}

      <SlateEditor value={initialValue} onChange={console.debug}/>
    </main>
  );
};

export default App;
