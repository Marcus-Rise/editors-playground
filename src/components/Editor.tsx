import React, {memo, useEffect, useRef} from "react";
import EditorJS from "@editorjs/editorjs";
import {EDITOR_TOOLS} from "./EditorTools";
import {EditorDto} from "../dto";

type Props = {
  data?: EditorDto;
  onChange(val: EditorDto): void;
  holder: string;
};

const EditorBlock = ({data, onChange, holder}: Props) => {
  const ref = useRef<EditorJS>();

  useEffect(() => {
    if (!ref.current) {
      ref.current = new EditorJS({
        holder: holder,
        tools: EDITOR_TOOLS,
        data: {
          blocks: data ?? [],
        },
        async onChange(api, event) {
          const data = await api.saver.save();
          onChange(data.blocks as EditorDto);
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
      ref.current?.render({blocks: data});
    }
  }, [data]);

  return <div id={holder}/>;
};

export default memo(EditorBlock);
