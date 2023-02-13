import {ComponentProps, FC, PropsWithChildren, useCallback, useMemo} from "react";
import {Slate, withReact} from "slate-react";
import {withHistory} from "slate-history";
import {createEditor, Descendant} from "slate";

type EditorProps = ComponentProps<typeof Slate>;
type Props = { value?: EditorProps["value"], onChange?: EditorProps['onChange'] };

const EditorContextProvider: FC<PropsWithChildren<Props>> = ({children, value = [], onChange, ...props}) => {
  const editor = useMemo(() => withReact(withHistory(createEditor())), []);

  const change: EditorProps["onChange"] = useCallback((data: Descendant[]) => {
    if (!data.length) {
      editor.insertNode({
        type: "paragraph",
        children: [
          {text: ""}
        ]
      });
    }

    if (onChange) {
      onChange(data);
    }
  }, [editor, onChange]);

  return <Slate {...props} onChange={change} value={value} editor={editor}>{children}</Slate>;
}

export {EditorContextProvider};
