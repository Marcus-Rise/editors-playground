import {OutputBlockData} from "@editorjs/editorjs";

/**
 * html string
 */
type ServerDto = string;

enum SliceType {
  PARAGRAPH = "paragraph",
  HEADER = "header",
  LIST = "list",
  DELIMITER = "delimiter",
  IMAGE = "image",
  TABLE = "table",
}

type SliceParagraph = OutputBlockData<SliceType.PARAGRAPH, {
  text: string;
}>;
type SliceHeader = OutputBlockData<SliceType.HEADER, {
  text: string;
  level: number;
}>;
type SliceList = OutputBlockData<SliceType.LIST, {
  style: "unordered" | "ordered";
  items: Array<string>;
}>;
type SliceDelimiter = OutputBlockData<SliceType.DELIMITER, {}>;
type SliceImage = OutputBlockData<SliceType.IMAGE, {
  file: {
    url: string;
  };
  caption: string;
  withBorder: boolean;
  stretched: boolean;
  withBackground: boolean;
}>;
type SliceTable = OutputBlockData<SliceType.TABLE, {
  withHeadings: boolean;
  content: Array<Array<string>>;
}>;

type EditorDto = Array<SliceParagraph
  | SliceHeader
  | SliceList
  | SliceDelimiter
  | SliceImage
  | SliceTable
>;

export type {ServerDto, EditorDto, SliceTable};
export {SliceType};
