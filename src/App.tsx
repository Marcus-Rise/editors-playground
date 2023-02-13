import React, {ComponentProps, FC, useCallback} from 'react';
import {Editor, EditorContextProvider, EditorToolbar} from "./Editor";
import styled, {ThemeProvider} from "styled-components";
import {LIGHT_THEME} from "@admiral-ds/react-ui";
import {initialData} from "./initial.data";
import {serialize} from "./Editor/utils/serialize.helper";
import {Descendant} from "slate";

const Main = styled.main`
  padding: 1rem;
`;

const App: FC = () => {
  const sendData: ComponentProps<typeof EditorContextProvider>["onChange"] = useCallback((dto: Descendant[]) => {
    console.log("editor data", dto);

    const html = dto.map((node) => serialize(node)).join('\n');

    console.log("serialized data", html);
  }, []);

  return (
    <ThemeProvider theme={LIGHT_THEME}>
      <Main>
        <EditorContextProvider value={initialData} onChange={sendData}>
          <EditorToolbar/>
          <Editor/>
        </EditorContextProvider>
      </Main>
    </ThemeProvider>
  );
};

export default App;
