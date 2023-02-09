import {createContext, FC, PropsWithChildren, useMemo} from "react";
import {CustomEditor} from "../types/slate";
import {withReact} from "slate-react";
import {withHistory} from "slate-history";
import {createEditor} from "slate";

type State = {
  editor: CustomEditor | null;
}

const defaultState: State = {editor: null};

const EditorContext = createContext<State>(defaultState);

const EditorContextProvider: FC<PropsWithChildren> = ({children}) => {
  const editor = useMemo(() => withReact(withHistory(createEditor())), []);

  return <EditorContext.Provider value={{editor}}>{children}</EditorContext.Provider>;
}

export {EditorContextProvider, EditorContext};
