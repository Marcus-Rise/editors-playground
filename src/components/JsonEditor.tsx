import React, {FC} from "react";
// @ts-ignore
import { JsonEditor as Editor } from 'jsoneditor-react';
import 'jsoneditor-react/es/editor.min.css';

type Json = any;

const JsonEditor: FC<{ onChange: (obj: Json) => void, data: Json }> = ({onChange, data}) => (
  <Editor
    value={data}
    onChange={onChange}
  />
);

export {JsonEditor}
