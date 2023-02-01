import React, {FC, useState} from 'react';
import initialData from './data.json'
import Editor from "./components/Editor";
import EditorJsRenderer from "./components/EditorJsRenderer";
import {EditorDto, EditorDtoFactory, ServerDto, ServerDtoFactory} from "./dto";
import {ServerDtoForm} from "./components/ServerDtoForm";

const App: FC = () => {
  const [data, setData] = useState<EditorDto>(initialData.blocks as EditorDto);

  const processEditorData = (data: EditorDto): void => {
    console.debug("processEditorData", "blocks", data);

    const dto = ServerDtoFactory.fromEditorDto(data);

    console.debug("processEditorData", "result", dto);

    setData(data);
  };

  const processServerDto = (dto: ServerDto) => {
    console.debug("processServerDto", "dto", dto);

    const editorDto = EditorDtoFactory.fromServerDto(dto);

    console.debug("processServerDto", "editorDto", editorDto);

    setData(editorDto);
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
