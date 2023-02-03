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
type SliceTable = OutputBlockData<SliceType.TABLE, {
  withHeadings: boolean;
  content: Array<Array<string>>;
}>;
type SliceUnknown = OutputBlockData<"unknown", {}>;

type Slice = SliceParagraph
  | SliceHeader
  | SliceList
  | SliceDelimiter
  | SliceTable
  | SliceUnknown;

type EditorDto = Array<Slice>;

export type {ServerDto, Slice, EditorDto, SliceTable, SliceParagraph, SliceHeader, SliceList};
export {SliceType};
