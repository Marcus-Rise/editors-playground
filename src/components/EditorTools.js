import Code from "@editorjs/code";
import Header from "@editorjs/header";
import Paragraph from "@editorjs/paragraph";
import List from '@editorjs/list';
import Delimiter from '@editorjs/delimiter';
import Image from '@editorjs/image';
import Table from '@editorjs/table';
import createGenericInlineTool, {
  ItalicInlineTool,
  UnderlineInlineTool,
} from 'editorjs-inline-tool';


export const EDITOR_TOOLS = {
  code: Code,
  header: Header,
  paragraph: {
    class: Paragraph,
    inlineToolbar: true,
  },
  bold: {
    class: createGenericInlineTool({
      sanitize: {
        strong: {},
      },
      shortcut: 'CMD+B',
      tagName: 'STRONG',
      toolboxIcon:
        '<svg class="icon icon--bold" width="12px" height="14px"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#bold"></use></svg>',
    }),
  },
  // or use a pre-defined tool instead
  italic: ItalicInlineTool,
  underline: UnderlineInlineTool,
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
