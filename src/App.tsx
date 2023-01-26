import React, {FC, useState} from 'react';
import initialData from './data.json'
import Editor from "./components/Editor";
import {JsonEditor} from "./components/JsonEditor";
import {OutputData} from "@editorjs/editorjs";
import EditorJsRenderer from "./components/EditorJsRenderer";

const App: FC = () => {
  const [data, setData] = useState<OutputData>(initialData);

  return (
    <main>
      <JsonEditor data={data} onChange={(data) => setData(data)} />

      <Editor
        onChange={(row) => console.debug(row)}
        holder={"ad"}
        data={data}
      />

      <h2>Preview</h2>

      {!!data && <EditorJsRenderer data={data}/>}
    </main>
  );
};

export default App;
