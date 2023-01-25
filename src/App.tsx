import React, {FC, useState} from 'react';
import initialData from './data.json'
import Editor from "./components/Editor";
import {JsonEditor} from "./components/JsonEditor";
import {OutputData} from "@editorjs/editorjs";

const App: FC = () => {
  const [data, setData] = useState<OutputData>(initialData);

  return (
    <>
      <JsonEditor data={data} onChange={(data) => setData(data)} />

      <Editor
        onChange={(row) => console.debug(row)}
        holder={"ad"}
        data={data}
      />
    </>
  );
};

export default App;
