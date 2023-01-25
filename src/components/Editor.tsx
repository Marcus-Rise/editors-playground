import React, {memo, useEffect, useRef} from "react";
import EditorJS, {OutputData} from "@editorjs/editorjs";
import {EDITOR_TOOLS} from "./EditorTools";

type Props = {
  data?: OutputData;
  onChange(val: OutputData): void;
  holder: string;
};

const EditorBlock = ({ data, onChange, holder }: Props) => {
  const ref = useRef<EditorJS>();

  useEffect(() => {
    if (!ref.current) {
      ref.current = new EditorJS({
        holder: holder,
        tools: EDITOR_TOOLS,
        data,
        async onChange(api, event) {
          const data = await api.saver.save();
          onChange(data);
        },
      });
    }

    return () => {
      if (ref.current && ref.current.destroy) {
        ref.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!!ref.current?.render && data) {
      ref.current?.render(data);
    }
  }, [data]);

  return <div id={holder} />;
};

export default memo(EditorBlock);
