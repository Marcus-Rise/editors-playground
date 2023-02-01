import React, {FC, useState} from 'react';
import initialData from './data.json'
import Editor from "./components/Editor";
import {OutputData} from "@editorjs/editorjs";
import EditorJsRenderer from "./components/EditorJsRenderer";
import {EditorDtoFactory, ServerDto, ServerDtoFactory} from "./dto";
import {ServerDtoForm} from "./components/ServerDtoForm";

const App: FC = () => {
  const [data, setData] = useState<OutputData>(initialData);

  const processEditorData = (data: OutputData): void => {
    console.debug("processEditorData", "blocks", data.blocks);

    const dto = ServerDtoFactory.fromEditorDto(data.blocks);

    console.debug("processEditorData", "result", dto);
  };

  const processServerDto = (dto: ServerDto) => {
    console.debug("processServerDto", "dto", dto);

    const editorDto = EditorDtoFactory.fromServerDto(dto);

    console.debug("processServerDto", "editorDto", editorDto);

    setData((data) => ({...data, blocks: editorDto}));
  }

  return (
    <main>
      <ServerDtoForm onChange={processServerDto} defaultValue={`<p>awdwada</p>`}/>

      <Editor
        onChange={processEditorData}
        holder={"ad"}
        data={data}
      />

      <h2>Preview</h2>

      {!!data && <EditorJsRenderer data={data}/>}
    </main>
  );
};

export default App;
