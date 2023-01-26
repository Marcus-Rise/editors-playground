import { OutputData } from "@editorjs/editorjs";

type TableBlock = {
  data: {
    "withHeadings": boolean,
    "content": string[][];
  }
}

const editorJsHtml = require("editorjs-html");
const EditorJsToHtml = editorJsHtml({
  table: (block: TableBlock) => {
    const rows = block.data.content
      .map((row, rowIndex) => `<tr>${
        row
          .map(cell => {
            const cellTag = (block.data.withHeadings && rowIndex === 0) ? 'th' : 'td'
            return `<${cellTag}>${cell}</${cellTag}>`
          })
          .join('')
      }</tr>`)
      .join('')
    return `<table>${rows}</table>`
  }
});

type Props = {
  data: OutputData;
};
type ParsedContent = string | JSX.Element;

const EditorJsRenderer = ({ data }: Props) => {
  const html = EditorJsToHtml.parse(data) as ParsedContent[];


  return (
    <div className="prose max-w-full ">
      {html.map((item, index, self) => {

        if (item instanceof Error) {
          console.error(item);

          return null;
        }

        return typeof item === "string" ? (
          <div dangerouslySetInnerHTML={{__html: item}} key={index}></div>
        ) : item;
      })}
    </div>
  );
};
export default EditorJsRenderer;
