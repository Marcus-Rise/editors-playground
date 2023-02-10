import React, {FC} from 'react';
import {Descendant} from "slate";
import {Editor, EditorContextProvider, EditorToolbar} from "./Editor";
import styled, {ThemeProvider} from "styled-components";
import {LIGHT_THEME} from "@admiral-ds/react-ui";

const initialValue: Array<Descendant> = [{
  type: "paragraph",
  children: [{
    text: "A line of text in a ",
  }, {
    text: "paragraph",
    href: "#",
  }, {
    text: "."
  }],
}];

const Main = styled.main`
padding: 1rem;
`;

const App: FC = () =>
  (
    <ThemeProvider theme={LIGHT_THEME}>
      <Main>
        <EditorContextProvider>
          <EditorToolbar />
          <Editor value={initialValue} onChange={console.log}/>
        </EditorContextProvider>
      </Main>
    </ThemeProvider>
  );

export default App;
