import {ComponentProps, FC, PropsWithChildren, useMemo} from "react";
import {Slate, withReact} from "slate-react";
import {withHistory} from "slate-history";
import {createEditor} from "slate";

type EditorProps = ComponentProps<typeof Slate>;
type Props = { value?: EditorProps["value"], onChange?: EditorProps['onChange'] };

const EditorContextProvider: FC<PropsWithChildren<Props>> = ({children, value = [],...props}) => {
  const editor = useMemo(() => withReact(withHistory(createEditor())), []);

  return <Slate {...props} value={value} editor={editor}>{children}</Slate>;
}

export {EditorContextProvider};
