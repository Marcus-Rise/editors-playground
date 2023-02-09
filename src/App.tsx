import React, {FC} from 'react';
import {Descendant} from "slate";
import {Editor, EditorContextProvider, EditorToolbar} from "./Editor";

const initialValue: Array<Descendant> = [{
  type: "paragraph",
  children: [{
    text: "A line of text in a paragraph.",
  }],
}];

const App: FC = () =>
  (
    <main>
      <EditorContextProvider>
        <EditorToolbar/>
        <Editor value={initialValue} onChange={console.log}/>
      </EditorContextProvider>
    </main>
  );

export default App;
