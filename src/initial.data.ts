import {CustomElement} from "./types/slate";

const initialData: Array<CustomElement> = [
  {
    type: "paragraph",
    children: [
      {
        text: "A line of text in a ",
      }, {
        text: "paragraph",
        href: "www.cats.com",
      }, {
        text: ". "
      }, {
        text: "Text "
      }, {
        text: "color",
        color: "#1BA049"
      },
    ],
  },
  {
    type: "list_ordered",
    children: [
      {
        type: 'list_item',
        children: [
          {text: "list_ordered Item1"},
        ],
      },
      {
        type: 'list_item',
        children: [
          {text: "list_ordered Item2"},
        ],
      },
      {
        type: 'list_item',
        children: [
          {text: "list_ordered Item3"},
        ],
      },
    ],
  }
];

export {initialData}
