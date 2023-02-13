import {CustomElement} from "./types/slate";

const initialData: Array<CustomElement> = [
  {
    "type": "paragraph",
    "children": [
      {
        "text": "A line of text in a paragraph. It can contains marks such as:"
      }
    ]
  },
  {
    "type": "list_ordered",
    "children": [
      {
        "type": "list_item",
        "children": [
          {
            "text": "text "
          },
          {
            "text": "color",
            "color": "#D02670"
          }
        ]
      },
      {
        "type": "list_item",
        "children": [
          {
            "text": "bold",
            "bold": true
          },
          {
            "text": " text"
          }
        ]
      },
      {
        "type": "list_item",
        "children": [
          {
            "text": "italic",
            "italic": true
          },
          {
            "text": " text"
          }
        ]
      },
      {
        "type": "list_item",
        "children": [
          {
            "text": "underline",
            "underline": true
          },
          {
            "text": " text"
          }
        ]
      },
      {
        "type": "list_item",
        "children": [
          {
            "text": "links",
            "href": "www.cats.com"
          }
        ]
      }
    ]
  }
];

export {initialData}
