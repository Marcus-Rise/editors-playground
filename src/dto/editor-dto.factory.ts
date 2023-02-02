import {EditorDto, ServerDto, SliceType} from "./types";

abstract class EditorDtoFactory {
  static fromServerDto(dto: ServerDto): EditorDto {
    const container = document.createElement("div");

    container.setAttribute("id", "test");
    container.innerHTML = dto;

    console.debug(container.childNodes);

    return Array.from(container.childNodes).reduce<EditorDto>((items, node) => {
      console.debug(node);

      switch (node.nodeName) {
        case "P": {
          return [...items, {
            type: SliceType.PARAGRAPH,
            data: {
              text: node.textContent ?? "",
            }
          }]
        }
        case "HR": {
          return [
            ...items,
            {
              type: SliceType.DELIMITER,
              data: {}
            }
          ]
        }
        case "UL": {
          return [
            ...items,
            {
              type: SliceType.LIST,
              data: {
                style: "unordered",
                items: Array.from(node.childNodes).map((listItem) => listItem.textContent ?? '')
              }
            }
          ]
        }
        case "OL": {
          return [
            ...items,
            {
              type: SliceType.LIST,
              data: {
                style: "ordered",
                items: Array.from(node.childNodes).map((listItem) => listItem.textContent ?? '')
              }
            }
          ]
        }
        case "TABLE": {
          const head = Array.from(node.childNodes).find((child) => child.nodeName === "THEAD");
          const body = Array.from(node.childNodes).find((child) => child.nodeName === "TBODY");
          const rows: Array<Array<string>> = [];

          if (!!head) {
            const headChildren = Array.from(head.childNodes.item(0).childNodes).map((child) => child.textContent ?? '')

            rows.push(headChildren);
          }

          if (!!body) {
            Array.from(body.childNodes).forEach(
              /**
               *
               * @param row <tr>
               */
              (row) => {
                const cells = Array.from(row.childNodes).map((child) => child.textContent ?? '');

                rows.push(cells);
              })
          }

          return [
            ...items,
            {
              type: SliceType.TABLE,
              data: {
                withHeadings: !!head,
                content: rows,
              }
            }
          ]
        }
        case "H1": {
          return [
            ...items,
            {
              type: SliceType.HEADER,
              data: {
                text: node.textContent ?? '',
                level: 1,
              }
            }
          ]
        }
        case "H2": {
          return [
            ...items,
            {
              type: SliceType.HEADER,
              data: {
                text: node.textContent ?? '',
                level: 2,
              }
            }
          ]
        }
        case "H3": {
          return [
            ...items,
            {
              type: SliceType.HEADER,
              data: {
                text: node.textContent ?? '',
                level: 3,
              }
            }
          ]
        }
        case "H4": {
          return [
            ...items,
            {
              type: SliceType.HEADER,
              data: {
                text: node.textContent ?? '',
                level: 4,
              }
            }
          ]
        }
        case "H5": {
          return [
            ...items,
            {
              type: SliceType.HEADER,
              data: {
                text: node.textContent ?? '',
                level: 5,
              }
            }
          ]
        }
        case "H6": {
          return [
            ...items,
            {
              type: SliceType.HEADER,
              data: {
                text: node.textContent ?? '',
                level: 6,
              }
            }
          ]
        }
        default: {
          console.warn("unknown element", node);
          return items;
        }
      }
    }, []);
  }
}

export {EditorDtoFactory}
