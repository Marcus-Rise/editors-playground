import React, {FC} from 'react';
import {Editor, EditorContextProvider, EditorToolbar} from "./Editor";
import styled, {ThemeProvider} from "styled-components";
import {LIGHT_THEME} from "@admiral-ds/react-ui";
import {initialData} from "./initial.data";

const Main = styled.main`
  padding: 1rem;
`;

const App: FC = () =>
  (
    <ThemeProvider theme={LIGHT_THEME}>
      <Main>
        <EditorContextProvider value={initialData} onChange={console.log}>
          <EditorToolbar/>
          <Editor/>
        </EditorContextProvider>
      </Main>
    </ThemeProvider>
  );

export default App;
