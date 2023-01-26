import Code from "@editorjs/code";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import List from '@editorjs/list';
import Delimiter from '@editorjs/delimiter';
import Image from '@editorjs/image';
import Table from '@editorjs/table';
import {UnderlineInlineTool,} from 'editorjs-inline-tool';


export const EDITOR_TOOLS = {
  underline: UnderlineInlineTool,
  code: Code,
  header: Header,
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  list: {
    class: List,
    inlineToolbar: true,
  },
  delimiter: Delimiter,
  image: Image,
  table: {
    class: Table,
    inlineToolbar: true,
  },
};
