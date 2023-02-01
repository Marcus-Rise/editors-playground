import {EditorDto, ServerDto, SliceType} from "./types";

abstract class ServerDtoFactory {
  static fromEditorDto(dto: EditorDto): ServerDto {
    return dto.map((element) => {
      switch (element.type) {
        case SliceType.HEADER: {
         return `<h${element.data.level}>${element.data.text}</h${element.data.level}>`
        }
        case SliceType.PARAGRAPH: {
          return `<p>${element.data.text}</p>`
        }
        case SliceType.DELIMITER: {
          return `<hr/>`;
        }
        case SliceType.LIST: {
          const list = element.data.style === "ordered" ? "ol" : "ul";
          const items = element.data.items.map((item) => `<li>${item}</li>`);

          return `<${list}>${items.join('')}</${list}>`
        }
        case SliceType.IMAGE: {
          return `<img src="${element.data.file.url}" alt="${element.data.caption}" />`;
        }
        case SliceType.TABLE: {
          let head = '';

          if (element.data.withHeadings) {
            const cols = element.data.content.at(0)?.map((item) => `<th>${item}</th>`).join('');

            if (cols) {
              head = `<thead><tr>${cols}</tr></thead>`;
            }
          }

          const [_, ...rows] =element.data.content;
          const content = rows.map((row) => {
            const cols = row.map((col) => `<td>${col}</td>`).join('');

            return `<tr>${cols}</tr>`;
          }).join('');

          return `<table>${head}<tbody>${content}</tbody></table>`;
        }
        default: {
          return "";
        }
      }
    }).join('');
  }
}

export {ServerDtoFactory}
